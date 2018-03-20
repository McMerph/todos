package ru.mcmerphy.todos.rest.server.resources.testers;

import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

public class BadPathTester extends ResponseTester<ErrorMessage> {

    public BadPathTester(BadPathError error) {
        super(new ErrorMessage(error.getError()));

        setExpectedStatusCode(HttpStatus.SC_BAD_REQUEST);
        setClazz(ErrorMessage.class);
    }

}
