package ru.mcmerphy.todos.rest.server.exception.mappers;

import ru.mcmerphy.todos.rest.server.ErrorMessage;
import ru.mcmerphy.todos.rest.server.security.service.exception.InvalidAuthenticationTokenException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class InvalidAuthenticationTokenExceptionMapper implements ExceptionMapper<InvalidAuthenticationTokenException> {

    @Override
    public Response toResponse(InvalidAuthenticationTokenException e) {
        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity(new ErrorMessage(e.getMessage()))
                .type(MediaType.APPLICATION_JSON_TYPE)
                .build();
    }

}
