package ru.mcmerphy.todos.rest.server.exception.mappers;

import ru.mcmerphy.todos.dao.UserNotFoundException;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class UserNotFoundExceptionMapper implements ExceptionMapper<UserNotFoundException> {

    @Override
    public Response toResponse(UserNotFoundException e) {
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity(new ErrorMessage("User with username=" + e.getUserName() + " not found in database"))
                .type(MediaType.APPLICATION_JSON_TYPE)
                .build();
    }

}
