package ru.mcmerphy.todos.rest.server;

import ru.mcmerphy.todos.rest.server.exception.mappers.*;
import ru.mcmerphy.todos.rest.server.filters.*;
import ru.mcmerphy.todos.rest.server.resources.AuthenticationResource;
import ru.mcmerphy.todos.rest.server.resources.TodoItemResource;
import ru.mcmerphy.todos.rest.server.resources.UserResource;

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
        resources.add(UserResource.class);
        resources.add(AuthenticationResource.class);

        resources.add(TodoItemNotFoundExceptionMapper.class);
        resources.add(ConstraintViolationExceptionMapper.class);
        resources.add(RequestParametersExceptionMapper.class);
        resources.add(ProcessingExceptionMapper.class);
        resources.add(AuthenticationExceptionMapper.class);
        resources.add(InvalidAuthenticationTokenExceptionMapper.class);
        resources.add(AccessDeniedExceptionMapper.class);

        resources.add(LoggingFilter.class);
        resources.add(CorsFilter.class);
        resources.add(UnhandledErrorsFilter.class);
        resources.add(AuthenticationFilter.class);
        resources.add(AuthorizationFilter.class);

        return resources;
    }

}
