package ru.mcmerphy.todos.rest.server.filters;

import ru.mcmerphy.todos.domain.Authority;
import ru.mcmerphy.todos.rest.server.resources.Secured;
import ru.mcmerphy.todos.rest.server.security.AuthenticatedUserDetails;
import ru.mcmerphy.todos.rest.server.security.AuthenticationTokenDetails;
import ru.mcmerphy.todos.rest.server.security.service.exception.AccessDeniedException;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Secured
@Provider
@Priority(Priorities.AUTHORIZATION)
public class AuthorizationFilter implements ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        Class<?> resourceClass = resourceInfo.getResourceClass();
        List<Authority> classRoles = extractRoles(resourceClass);

        Method resourceMethod = resourceInfo.getResourceMethod();
        List<Authority> methodRoles = extractRoles(resourceMethod);

        try {
            // Check if the user is allowed to execute the method
            // The method annotations override the class annotations
            if (methodRoles.isEmpty()) {
                checkPermissions(classRoles, requestContext);
            } else {
                checkPermissions(methodRoles, requestContext);
            }
        } catch (Exception e) {
            requestContext.abortWith(
                    Response
                            .status(Response.Status.FORBIDDEN)
                            .build());
        }
    }

    /**
     * Extract the roles from the annotated element.
     */
    private List<Authority> extractRoles(AnnotatedElement annotatedElement) {
        if (annotatedElement == null) {
            return new ArrayList<Authority>();
        } else {
            Secured secured = annotatedElement.getAnnotation(Secured.class);
            if (secured == null) {
                return new ArrayList<Authority>();
            } else {
                Authority[] allowedRoles = secured.value();
                return Arrays.asList(allowedRoles);
            }
        }
    }

    /**
     * Check if the user contains one of the allowed roles.
     * Throw an Exception if the user has not permission to execute the method.
     */
    private void checkPermissions(
            List<Authority> allowedRoles,
            ContainerRequestContext requestContext
    ) throws Exception {
        SecurityContext securityContext = requestContext.getSecurityContext();
        AuthenticatedUserDetails user = (AuthenticatedUserDetails) securityContext.getUserPrincipal();
        AuthenticationTokenDetails tokenDetails = user.getAuthenticationTokenDetails();
        boolean inRole = tokenDetails.getAuthorities().stream().anyMatch(allowedRoles::contains);
        if (!inRole) {
            throw new AccessDeniedException("You don't have permissions to perform this action.");
        }
    }

}
