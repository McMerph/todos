package ru.mcmerphy.todos.rest.server.resources.testers;

import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

import java.util.Objects;

public class IncompleteRequestBodyTester extends ResponseTester<ErrorMessage> {

    public IncompleteRequestBodyTester(String json) {
        super(new ErrorMessage("Service for creating todo-items is available at root. Please provide 'text': 'string' and 'completed': 'boolean' fields in json body"));

        if (Objects.nonNull(json)) {
            setJsonBody(json);
        }
        setExpectedStatusCode(HttpStatus.SC_BAD_REQUEST);
        setClazz(ErrorMessage.class);
    }

}
