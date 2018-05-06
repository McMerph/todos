package ru.mcmerphy.todos.rest.server.exceptions.mappers;

import ru.mcmerphy.todos.rest.server.entities.ErrorMessage;
import ru.mcmerphy.todos.rest.server.resources.TodoItemResource;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.ProcessingException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.net.URI;
import java.util.Objects;

//TODO Delete class?
@Provider
public class ProcessingExceptionMapper implements ExceptionMapper<ProcessingException> {

    @Context
    private HttpServletRequest request;

    @Context
    private ContainerRequestContext requestContext;

    @Override
    public Response toResponse(ProcessingException e) {
        boolean todoItemResource = isTodoItemResource(requestContext);
        boolean putRequest = Objects.equals(request.getMethod(), HttpMethod.PUT);
        boolean sync = todoItemResource && putRequest;
        Response.Status status = sync ? Response.Status.BAD_REQUEST : Response.Status.INTERNAL_SERVER_ERROR;
        String messageString = sync ? "Please provide valid list of todoItems" : e.getLocalizedMessage();
        ErrorMessage message = new ErrorMessage(messageString);

        return Response
                .status(status)
                .entity(message)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .build();
    }

    private static boolean isTodoItemResource(ContainerRequestContext requestContext) {
        URI todoItemResource = requestContext.getUriInfo().getBaseUriBuilder()
                .path(TodoItemResource.class)
                .build();
        URI currentResource = requestContext.getUriInfo().getBaseUriBuilder().build();

        return Objects.equals(todoItemResource, currentResource);
    }

}
