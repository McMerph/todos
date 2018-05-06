package ru.mcmerphy.todos.rest.server.exceptions;

/**
 * Thrown if errors occur during the authorization process.
 */
public class AccessDeniedException extends RuntimeException {

    public AccessDeniedException(String message) {
        super(message);
    }

    public AccessDeniedException(String message, Throwable cause) {
        super(message, cause);
    }

}
