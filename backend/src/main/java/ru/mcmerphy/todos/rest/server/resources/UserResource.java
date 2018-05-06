package ru.mcmerphy.todos.rest.server.resources;

import ru.mcmerphy.todos.dao.UserNotFoundException;
import ru.mcmerphy.todos.dao.UserService;
import ru.mcmerphy.todos.domain.Authority;
import ru.mcmerphy.todos.domain.User;
import ru.mcmerphy.todos.rest.server.UsersResponse;
import ru.mcmerphy.todos.rest.server.filters.Logged;
import ru.mcmerphy.todos.rest.server.validators.RequestParametersException;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * JAX-RS resource class that provides operations for users.
 */
@RequestScoped
@Path("/users")
public class UserResource {

    @Inject
    private UserService service;

    @Logged
    @GET
    @Secured({Authority.ADMIN})
    @Produces(MediaType.APPLICATION_JSON)
    public UsersResponse getAllUsers() {
        List<User> users = service.findAll();
        return new UsersResponse(users);
    }

    @Logged
    @GET
    @Path("/{userName}")
    @Secured({Authority.ADMIN})
    @Produces(MediaType.APPLICATION_JSON)
    public User getUserByName(@PathParam("userName") String userName)
            throws RequestParametersException, UserNotFoundException {
        return service.findUserByName(userName);
    }

}
