package ru.mcmerphy.todos.rest.server.exceptions;

import ru.mcmerphy.todos.rest.server.entities.ErrorMessage;

public class RequestParametersException extends Exception {

    private ErrorMessage errorMessage;

    public RequestParametersException() {
    }

    public RequestParametersException(ErrorMessage errorMessage) {
        super();
        this.errorMessage = errorMessage;
    }

    public ErrorMessage getErrorMessage() {
        return errorMessage;
    }

}
