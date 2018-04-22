package ru.mcmerphy.todos.rest.server.resources;

import ru.mcmerphy.todos.dao.UserService;
import ru.mcmerphy.todos.domain.User;
import ru.mcmerphy.todos.rest.server.UsersResponse;
import ru.mcmerphy.todos.rest.server.filters.Logged;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@RequestScoped
@Path("/users")
public class UserResource {

    @Inject
    private UserService service;

    @Logged
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public UsersResponse getAllUsers() {
        List<User> users = service.findAll();
        return new UsersResponse(users);
    }

}
