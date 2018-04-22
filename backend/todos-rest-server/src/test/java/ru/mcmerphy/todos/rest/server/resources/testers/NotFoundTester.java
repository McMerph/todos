package ru.mcmerphy.todos.rest.server.resources.testers;

import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

public class NotFoundTester extends ResponseTester<ErrorMessage> {

    public NotFoundTester(String path) {
        super(new ErrorMessage(RequestError.NOT_FOUND));

        setUri(path);
        setExpectedStatusCode(HttpStatus.SC_NOT_FOUND);
        setClazz(ErrorMessage.class);
    }

}
