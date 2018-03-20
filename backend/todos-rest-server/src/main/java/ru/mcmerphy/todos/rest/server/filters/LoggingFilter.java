package ru.mcmerphy.todos.rest.server.filters;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;
import java.net.URI;

@Logged
@Provider
public class LoggingFilter implements ContainerRequestFilter {

    private static final Logger logger = LogManager.getLogger("todos-rest-server");

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String method = requestContext.getMethod();
        URI absolutePath = requestContext.getUriInfo().getAbsolutePath();
        MultivaluedMap<String, String> headers = requestContext.getHeaders();
        MediaType mediaType = requestContext.getMediaType();
        String logEntry = "Method: " + method +
                " ||| path: " + absolutePath +
                " ||| headers: " + headers +
                " ||| mediaType: " + mediaType;
        logger.info(logEntry);
    }

}
