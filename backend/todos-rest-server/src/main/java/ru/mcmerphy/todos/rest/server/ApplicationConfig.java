package ru.mcmerphy.todos.rest.server;

import ru.mcmerphy.todos.rest.server.resources.StubResource;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        resources.add(StubResource.class);

        return resources;
    }

}
