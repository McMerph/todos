package ru.mcmerphy.todos.rest.server.filters;

import ru.mcmerphy.todos.rest.server.ErrorMessage;

import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MediaType;
import java.util.Objects;

//TODO Delete class?
public class UnhandledErrorsFilter implements ContainerResponseFilter {

    @Override
    @Produces(MediaType.APPLICATION_JSON)
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        boolean error = responseContext.getStatus() >= 400;
        boolean unhandledMessage = !Objects.equals(responseContext.getEntityClass(), ErrorMessage.class);
        if (error && unhandledMessage) {
            ErrorMessage errorMessage = new ErrorMessage(responseContext.getStatusInfo().getReasonPhrase());
            responseContext.setEntity(errorMessage, null, MediaType.APPLICATION_JSON_TYPE);
        }
    }

}
