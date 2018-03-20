package ru.mcmerphy.todos.rest.server.resources.testers;

import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

public class InvalidQueryParametersTester extends SearchTester<ErrorMessage> {

    public InvalidQueryParametersTester(InvalidQueryParametersError error) {
        super(new ErrorMessage(error.getErrors()));

        setExpectedStatusCode(HttpStatus.SC_BAD_REQUEST);
        setClazz(ErrorMessage.class);
    }

}
