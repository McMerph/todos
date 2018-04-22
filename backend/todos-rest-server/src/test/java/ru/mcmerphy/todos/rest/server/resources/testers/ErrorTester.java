package ru.mcmerphy.todos.rest.server.resources.testers;

import ru.mcmerphy.todos.rest.server.ErrorMessage;

public class ErrorTester extends ResponseTester<ErrorMessage> {

    public ErrorTester(String path, int expectedStatusCode) {
        super(new ErrorMessage());

        setUri(path);
        setExpectedStatusCode(expectedStatusCode);
        setClazz(ErrorMessage.class);
    }

    public ErrorTester addExpectedError(String expectedError) {
        expectedResource.add(expectedError);
        return this;
    }

}
