package ru.mcmerphy.todos.rest.server.resources;

import ru.mcmerphy.todos.rest.server.filters.Logged;
import ru.mcmerphy.todos.rest.server.security.configuration.TestConfig;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

//TODO Delete class
@RequestScoped
@Path("/test")
public class TestResource {

    @Inject
    private TestConfig config;

    @Logged
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public TestConfig getConfig() {
        return config;
    }

}
