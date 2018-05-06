package ru.mcmerphy.todos.rest.server.resources;

import ru.mcmerphy.todos.domain.User;
import ru.mcmerphy.todos.domain.UserCredentials;
import ru.mcmerphy.todos.rest.server.security.AuthenticatedUserDetails;
import ru.mcmerphy.todos.rest.server.security.AuthenticationToken;
import ru.mcmerphy.todos.rest.server.security.AuthenticationTokenDetails;
import ru.mcmerphy.todos.rest.server.security.service.AuthenticationTokenService;
import ru.mcmerphy.todos.rest.server.security.service.UsernamePasswordValidator;

import javax.annotation.security.PermitAll;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * JAX-RS resource class that provides operations for authentication.
 */
@RequestScoped
@Path("/auth")
public class AuthenticationResource {

    @Context
    private SecurityContext securityContext;

    @Inject
    private UsernamePasswordValidator validator;

    @Inject
    private AuthenticationTokenService authenticationTokenService;

    /**
     * Validate user credentials and issue a token for the user.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response authenticate(UserCredentials credentials) {
        User user = validator.validateCredentials(credentials.getName(), credentials.getPassword());
        String token = authenticationTokenService.issueToken(user.getUsername(), user.getAuthorities());

//        TODO DRY
        AuthenticationToken authenticationToken = new AuthenticationToken();
        authenticationToken.setToken(token);
        return Response.ok(authenticationToken).build();
    }

    /**
     * Refresh the authentication token for the current user.
     */
    @POST
    @Path("refresh")
    @Produces(MediaType.APPLICATION_JSON)
    public Response refresh() {
        AuthenticatedUserDetails user = (AuthenticatedUserDetails) securityContext.getUserPrincipal();
        AuthenticationTokenDetails tokenDetails = user.getAuthenticationTokenDetails();
        String token = authenticationTokenService.refreshToken(tokenDetails);

//        TODO DRY
        AuthenticationToken authenticationToken = new AuthenticationToken();
        authenticationToken.setToken(token);
        return Response.ok(authenticationToken).build();
    }

}
