package ru.mcmerphy.todos.rest.server.filters;

import ru.mcmerphy.todos.rest.server.ErrorMessage;
import ru.mcmerphy.todos.rest.server.resources.TodoItemResource;

import javax.ws.rs.HttpMethod;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.Arrays;
import java.util.Objects;

import static javax.ws.rs.core.Response.Status.*;

public class ErrorResponseFilter implements ContainerResponseFilter {

    @Override
    @Produces(MediaType.APPLICATION_JSON)
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        int status = responseContext.getStatus();
        Response.Status[] filteredStatuses = {
                BAD_REQUEST,
                UNSUPPORTED_MEDIA_TYPE,
                METHOD_NOT_ALLOWED,
                INTERNAL_SERVER_ERROR
        };
        Arrays.stream(filteredStatuses)
                .filter(filteredStatus -> status == filteredStatus.getStatusCode())
                .findFirst()
                .ifPresent(filteredStatus -> {
                    if (Objects.equals(filteredStatus, BAD_REQUEST)) {
                        URI todoItemResource = requestContext.getUriInfo().getBaseUriBuilder()
                                .path(TodoItemResource.class)
                                .build();
                        URI currentResource = requestContext.getUriInfo().getBaseUriBuilder().build();
                        boolean isTodoItemResource = Objects.equals(todoItemResource, currentResource);
                        boolean postMethod = Objects.equals(requestContext.getMethod(), HttpMethod.POST);
                        boolean putMethod = Objects.equals(requestContext.getMethod(), HttpMethod.PUT);
                        if (isTodoItemResource && (postMethod || putMethod)) {
                            ErrorMessage errorMessage;
                            if (postMethod) {
                                errorMessage = new ErrorMessage(
                                        "Service for creating todo-items is available at root. Please provide 'text': 'string' and 'completed': 'boolean' fields in json body");
                            } else {
                                errorMessage = new ErrorMessage(
                                        "Service for updating todo-items is available at root/{id}. Please provide 'text': 'string' and 'completed': 'boolean' fields in json body");
                            }
                            responseContext.setEntity(errorMessage, null, MediaType.APPLICATION_JSON_TYPE);
                            responseContext.setStatusInfo(filteredStatus);
                        }
                    } else {
                        ErrorMessage errorMessage = new ErrorMessage(filteredStatus.getReasonPhrase());
                        responseContext.setEntity(errorMessage, null, MediaType.APPLICATION_JSON_TYPE);
                        responseContext.setStatusInfo(filteredStatus);
                    }
                });
    }

}
