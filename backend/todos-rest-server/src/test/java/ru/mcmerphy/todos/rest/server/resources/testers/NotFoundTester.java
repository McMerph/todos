package ru.mcmerphy.todos.rest.server.resources.testers;

import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

public class NotFoundTester extends ResponseTester<ErrorMessage> {

    public NotFoundTester(long id) {
        super(new ErrorMessage(RequestError.NOT_FOUND_PREFIX + id + RequestError.NOT_FOUND_SUFFIX));

        setExpectedStatusCode(HttpStatus.SC_NOT_FOUND);
        setClazz(ErrorMessage.class);
    }

}
