package ru.mcmerphy.todos.rest.server.exceptions;


/**
 * Thrown if an authentication token is invalid.
 */
public class InvalidAuthenticationTokenException extends RuntimeException {

    public InvalidAuthenticationTokenException(String message, Throwable cause) {
        super(message, cause);
    }

}
