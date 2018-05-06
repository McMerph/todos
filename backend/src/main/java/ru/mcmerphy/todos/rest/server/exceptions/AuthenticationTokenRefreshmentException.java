package ru.mcmerphy.todos.rest.server.exceptions;

/**
 * Thrown if an authentication token cannot be refreshed.
 */
public class AuthenticationTokenRefreshmentException extends RuntimeException {

    public AuthenticationTokenRefreshmentException(String message) {
        super(message);
    }

    public AuthenticationTokenRefreshmentException(String message, Throwable cause) {
        super(message, cause);
    }

}
