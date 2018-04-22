package ru.mcmerphy.todos.rest.server.security.service.exception;

/**
 * Thrown if errors occur during the authentication process.
 */
public class AuthenticationException extends RuntimeException {

    public AuthenticationException(String message) {
        super(message);
    }

    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }

}
