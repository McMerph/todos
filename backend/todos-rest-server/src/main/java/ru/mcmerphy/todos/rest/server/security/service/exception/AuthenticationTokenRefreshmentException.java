package ru.mcmerphy.todos.rest.server.security.service.exception;

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
