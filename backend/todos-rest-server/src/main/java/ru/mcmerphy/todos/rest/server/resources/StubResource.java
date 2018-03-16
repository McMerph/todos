package ru.mcmerphy.todos.rest.server.resources;

import ru.mcmerphy.todos.dao.TodoItemNotFoundException;
import ru.mcmerphy.todos.dao.TodoItemService;
import ru.mcmerphy.todos.domain.TodoItem;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;

@RequestScoped
@Path("/")
public class StubResource {

    @Inject
    private TodoItemService service;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response createTodoItem(TodoItem todoItem, @Context UriInfo uriInfo) {
        TodoItem createdTodoItem = service.create(todoItem);
        URI uri = uriInfo.getAbsolutePathBuilder()
                .path(String.valueOf(todoItem.getId()))
                .build();

        return Response.created(uri)
                .entity(createdTodoItem)
                .build();
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response getStub() {
        int count = service.count();
        return Response.ok("There are " + count + " instances of TodoItem in database").build();
    }

    @GET
    @Path("/{todoItemId}")
    @Produces(MediaType.APPLICATION_JSON)
    public TodoItem getJointedTrackPart(@PathParam("todoItemId") long todoItemId)
            throws TodoItemNotFoundException {
        return service.find(todoItemId);
    }

}
