package ru.mcmerphy.todos.rest.server.exceptions.mappers;

import ru.mcmerphy.todos.rest.server.exceptions.RequestParametersException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class RequestParametersExceptionMapper implements ExceptionMapper<RequestParametersException> {

    @Override
    public Response toResponse(RequestParametersException e) {
        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity(e.getErrorMessage())
                .type(MediaType.APPLICATION_JSON_TYPE)
                .build();
    }

}
