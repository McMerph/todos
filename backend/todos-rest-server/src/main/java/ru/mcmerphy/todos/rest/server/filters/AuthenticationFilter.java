package ru.mcmerphy.todos.rest.server.filters;

import ru.mcmerphy.todos.dao.UserNotFoundException;
import ru.mcmerphy.todos.dao.UserService;
import ru.mcmerphy.todos.domain.User;
import ru.mcmerphy.todos.rest.server.security.AuthenticatedUserDetails;
import ru.mcmerphy.todos.rest.server.security.AuthenticationTokenDetails;
import ru.mcmerphy.todos.rest.server.security.TokenBasedSecurityContext;
import ru.mcmerphy.todos.rest.server.security.service.AuthenticationTokenService;

import javax.annotation.Priority;
import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

/**
 * JWT authentication filter.
 */
@Provider
@Dependent
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Inject
    private UserService userService;

    @Inject
    private AuthenticationTokenService authenticationTokenService;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String authenticationToken = authorizationHeader.substring(7);
            try {
                handleTokenBasedAuthentication(authenticationToken, requestContext);
            } catch (UserNotFoundException e) {
//                TODO Handle exception
                e.printStackTrace();
            }
        }

        // Other authentication schemes (such as Basic) could be supported
    }

    private void handleTokenBasedAuthentication(
            String authenticationToken,
            ContainerRequestContext requestContext
    ) throws UserNotFoundException {
        AuthenticationTokenDetails authenticationTokenDetails =
                authenticationTokenService.parseToken(authenticationToken);
        User user = userService.findUserByName(authenticationTokenDetails.getUsername());
        AuthenticatedUserDetails authenticatedUserDetails = new AuthenticatedUserDetails(
                user.getUsername(),
                user.getAuthorities()
        );

        boolean isSecure = requestContext.getSecurityContext().isSecure();
        SecurityContext securityContext = new TokenBasedSecurityContext(
                authenticatedUserDetails,
                authenticationTokenDetails,
                isSecure
        );
        requestContext.setSecurityContext(securityContext);
    }

}
