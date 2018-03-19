package ru.mcmerphy.todos.rest.server.filters;

import ru.mcmerphy.todos.rest.server.ErrorMessage;
import ru.mcmerphy.todos.rest.server.resources.TodoItemResource;

import javax.ws.rs.HttpMethod;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.PathSegment;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@PreMatching
public class RequestFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestContext) {
        if (isGetOrDeleteTodoItemResource(requestContext)) {
            List<String> paths = requestContext.getUriInfo().getPathSegments().stream()
                    .map(PathSegment::getPath)
                    .collect(Collectors.toList());
            if (isRootRequest(paths)) {
                validateTodoItemResourceQueryParameters(requestContext);
            } else {
                validateTodoItemResourcePaths(paths, requestContext);
            }
        }
    }

    private boolean isGetOrDeleteTodoItemResource(ContainerRequestContext requestContext) {
        URI todoItemResource = requestContext.getUriInfo().getBaseUriBuilder()
                .path(TodoItemResource.class)
                .build();
        URI currentResource = requestContext.getUriInfo().getBaseUriBuilder().build();

        return (Objects.equals(requestContext.getMethod(), HttpMethod.GET) ||
                Objects.equals(requestContext.getMethod(), HttpMethod.DELETE)) &&
                Objects.equals(todoItemResource, currentResource);
    }

    private boolean isRootRequest(List<String> paths) {
        return paths.size() == 1 && paths.get(0).isEmpty();
    }

    private void validateTodoItemResourceQueryParameters(ContainerRequestContext requestContext) {
        MultivaluedMap<String, String> queryParameters = requestContext.getUriInfo().getQueryParameters();
        String[] integerQueryParameters = {"firstResult", "maxResults"};
        if (queryParameters.keySet().containsAll(Arrays.asList(integerQueryParameters))) {
            validateTodoItemResourceIntegerQueryParameters(requestContext, queryParameters, integerQueryParameters);
        } else {
            abortBadRequest(
                    requestContext,
                    new ErrorMessage("Please provide 'firstResult' and 'maxResults' query parameters"));
        }
    }

    private void validateTodoItemResourceIntegerQueryParameters(
            ContainerRequestContext requestContext,
            MultivaluedMap<String, String> queryParameters,
            String[] integerQueryParameters) {
        List<String> nonIntegerQueryParameters = queryParameters.keySet().stream()
                .filter(queryParameter -> Arrays.asList(integerQueryParameters).contains(queryParameter))
                .filter(queryParameter -> {
                    try {
                        Integer.parseInt(queryParameters.get(queryParameter).get(0));
                    } catch (NumberFormatException e) {
                        return true;
                    }
                    return false;
                })
                .collect(Collectors.toList());
        if (nonIntegerQueryParameters.size() > 0) {
            Set<String> errors = nonIntegerQueryParameters.stream()
                    .map(parameter -> "Query parameter '" + parameter + "' should be integer")
                    .collect(Collectors.toSet());
            abortBadRequest(
                    requestContext,
                    new ErrorMessage(errors));
        }
    }

    private void validateTodoItemResourcePaths(List<String> paths, ContainerRequestContext requestContext) {
        if (paths.size() == 1) {
            try {
                Long.parseLong(paths.get(0));
            } catch (NumberFormatException e) {
                abortBadRequest(
                        requestContext,
                        new ErrorMessage("Todo item id from request path should be integer")
                );
            }
        } else if (paths.size() > 1) {
            abortBadRequest(
                    requestContext,
                    new ErrorMessage("Too many paths in request. Please provide single integer path for todo item")
            );
        }
    }

    private void abortBadRequest(ContainerRequestContext requestContext, ErrorMessage errorMessage) {
        Response response = Response.
                status(Response.Status.BAD_REQUEST).
                entity(errorMessage).
                type(MediaType.APPLICATION_JSON_TYPE).
                build();
        requestContext.abortWith(response);
    }

}
