package ru.mcmerphy.todos.rest.server.exception.mappers;

import ru.mcmerphy.todos.dao.TodoItemNotFoundException;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class TodoItemNotFoundExceptionMapper implements ExceptionMapper<TodoItemNotFoundException> {

    @Override
    public Response toResponse(TodoItemNotFoundException e) {
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity(new ErrorMessage("Todo item with id=" + e.getId() + " not found in database"))
                .type(MediaType.APPLICATION_JSON_TYPE)
                .build();
    }
    
}
