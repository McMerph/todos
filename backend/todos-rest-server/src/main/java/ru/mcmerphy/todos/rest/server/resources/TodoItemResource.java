package ru.mcmerphy.todos.rest.server.resources;

import ru.mcmerphy.todos.dao.TodoItemNotFoundException;
import ru.mcmerphy.todos.dao.TodoItemService;
import ru.mcmerphy.todos.domain.TodoItem;
import ru.mcmerphy.todos.rest.server.SearchRequest;
import ru.mcmerphy.todos.rest.server.SearchResponse;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.List;

@RequestScoped
@Path("/")
public class TodoItemResource {

    @Inject
    private TodoItemService service;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response createTodoItem(TodoItem todoItem, @Context UriInfo uriInfo) {
        TodoItem createdTodoItem = service.create(todoItem);
        URI uri = uriInfo.getAbsolutePathBuilder()
                .path(String.valueOf(todoItem.getId()))
                .build();

        return Response
                .created(uri)
                .entity(createdTodoItem)
                .build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public SearchResponse getTodoItems(@BeanParam SearchRequest searchRequest) {
        int count = service.count();
        Integer firstResult = searchRequest.getFirstResult();
        Integer maxResults = searchRequest.getMaxResults();
        List<TodoItem> todoItems = service.findRange(firstResult, maxResults);

        return new SearchResponse(count, todoItems);
    }

    @GET
    @Path("/{todoItemId}")
    @Produces(MediaType.APPLICATION_JSON)
    public TodoItem getTodoItem(@PathParam("todoItemId") long todoItemId)
            throws TodoItemNotFoundException {
        return service.find(todoItemId);
    }

    @PUT
    @Path("/{todoItemId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public TodoItem updateTodoItem(@PathParam("todoItemId") int id, TodoItem jointedTrackPart)
            throws TodoItemNotFoundException {
        return service.update(id, jointedTrackPart);
    }

    @DELETE
    @Path("/{todoItemId}")
    @Produces(MediaType.APPLICATION_JSON)
    public TodoItem deleteJointedTrackPart(@PathParam("todoItemId") long id)
            throws TodoItemNotFoundException {
        TodoItem todoItem = service.find(id);
        service.remove(todoItem);

        return todoItem;
    }

}
