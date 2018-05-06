package ru.mcmerphy.todos.rest.server.mappers;

import ru.mcmerphy.todos.rest.server.ErrorMessage;
import ru.mcmerphy.todos.rest.server.security.service.exception.AccessDeniedException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class AccessDeniedExceptionMapper implements ExceptionMapper<AccessDeniedException> {

    @Override
    public Response toResponse(AccessDeniedException e) {
        return Response
                .status(Response.Status.FORBIDDEN)
                .entity(new ErrorMessage(e.getMessage()))
                .type(MediaType.APPLICATION_JSON_TYPE)
                .build();
    }

}
