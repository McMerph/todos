package ru.mcmerphy.todos.rest.server.mappers;

import ru.mcmerphy.todos.rest.server.ErrorMessage;
import ru.mcmerphy.todos.rest.server.security.service.exception.AuthenticationException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class AuthenticationExceptionMapper implements ExceptionMapper<AuthenticationException> {

    @Override
    public Response toResponse(AuthenticationException e) {
        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity(new ErrorMessage(e.getMessage()))
                .type(MediaType.APPLICATION_JSON_TYPE)
                .build();
    }

}
