package ru.mcmerphy.todos.rest.server;

import ru.mcmerphy.todos.rest.server.resources.TodoItemResource;

import javax.ws.rs.container.ContainerRequestContext;
import java.net.URI;
import java.util.Objects;

public class Utils {

    public static boolean isTodoItemResource(ContainerRequestContext requestContext) {
        URI todoItemResource = requestContext.getUriInfo().getBaseUriBuilder()
                .path(TodoItemResource.class)
                .build();
        URI currentResource = requestContext.getUriInfo().getBaseUriBuilder().build();

        return Objects.equals(todoItemResource, currentResource);
    }

}
