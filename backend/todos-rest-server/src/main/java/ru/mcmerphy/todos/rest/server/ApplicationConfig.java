package ru.mcmerphy.todos.rest.server;

import ru.mcmerphy.todos.rest.server.exception.mappers.ConstraintViolationExceptionMapper;
import ru.mcmerphy.todos.rest.server.exception.mappers.RequestParametersExceptionMapper;
import ru.mcmerphy.todos.rest.server.exception.mappers.TodoItemNotFoundExceptionMapper;
import ru.mcmerphy.todos.rest.server.filters.CorsFilter;
import ru.mcmerphy.todos.rest.server.filters.LoggingFilter;
import ru.mcmerphy.todos.rest.server.filters.RequestFilter;
import ru.mcmerphy.todos.rest.server.filters.ResponseFilter;
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
        resources.add(RequestParametersExceptionMapper.class);

        resources.add(LoggingFilter.class);
        resources.add(CorsFilter.class);
        resources.add(RequestFilter.class);
        resources.add(ResponseFilter.class);

        return resources;
    }

}
