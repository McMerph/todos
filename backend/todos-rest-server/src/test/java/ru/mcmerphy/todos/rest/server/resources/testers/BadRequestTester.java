package ru.mcmerphy.todos.rest.server.resources.testers;

import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

public class BadRequestTester extends ResponseTester<ErrorMessage> {

    public BadRequestTester(String path) {
        super(new ErrorMessage());

        setUri(path);
        setExpectedStatusCode(HttpStatus.SC_BAD_REQUEST);
        setClazz(ErrorMessage.class);
    }

    public BadRequestTester addExpectedError(String expectedError) {
        expectedResource.add(expectedError);
        return this;
    }

}
