package ru.mcmerphy.todos.rest.server.resources.testers;

import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

public class InternalServerErrorTester extends ResponseTester<ErrorMessage> {

    public InternalServerErrorTester(String path) {
        super(new ErrorMessage());

        setUri(path);
        setExpectedStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR);
        setClazz(ErrorMessage.class);
    }

    public InternalServerErrorTester addExpectedError(String expectedError) {
        expectedResource.add(expectedError);
        return this;
    }

}
