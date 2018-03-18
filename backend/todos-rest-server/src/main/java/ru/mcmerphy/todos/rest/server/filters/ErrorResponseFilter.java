package ru.mcmerphy.todos.rest.server.filters;

import ru.mcmerphy.todos.rest.server.ErrorMessage;

import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Arrays;

import static javax.ws.rs.core.Response.Status.*;

public class ErrorResponseFilter implements ContainerResponseFilter {

    @Override
    @Produces(MediaType.APPLICATION_JSON)
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        int status = responseContext.getStatus();
        Response.Status[] filteredStatuses = {
                UNSUPPORTED_MEDIA_TYPE,
                METHOD_NOT_ALLOWED,
                INTERNAL_SERVER_ERROR
        };
        Arrays.stream(filteredStatuses)
                .filter(filteredStatus -> status == filteredStatus.getStatusCode())
                .findFirst()
                .ifPresent(filteredStatus -> {
                    ErrorMessage errorMessage = new ErrorMessage(filteredStatus.getReasonPhrase());
                    responseContext.setEntity(errorMessage, null, MediaType.APPLICATION_JSON_TYPE);
                    responseContext.setStatusInfo(filteredStatus);
                });
    }

}
