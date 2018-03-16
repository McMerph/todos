package ru.mcmerphy.todos.rest.server.resources;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Path("/")
public class StubResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response getStub() {
        return Response.ok("Hi from server!").build();
    }

}
