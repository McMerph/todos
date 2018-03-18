package ru.mcmerphy.todos.rest.server;

import ru.mcmerphy.todos.rest.server.exception.mappers.ConstraintViolationExceptionMapper;
import ru.mcmerphy.todos.rest.server.exception.mappers.TodoItemNotFoundExceptionMapper;
import ru.mcmerphy.todos.rest.server.filters.ErrorResponseFilter;
import ru.mcmerphy.todos.rest.server.filters.TodoItemResourceGetRequestFilter;
import ru.mcmerphy.todos.rest.server.resources.TodoItemResource;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        resources.add(TodoItemResource.class);

        resources.add(TodoItemNotFoundExceptionMapper.class);
        resources.add(ConstraintViolationExceptionMapper.class);

        resources.add(ErrorResponseFilter.class);
        resources.add(TodoItemResourceGetRequestFilter.class);

        return resources;
    }

}
