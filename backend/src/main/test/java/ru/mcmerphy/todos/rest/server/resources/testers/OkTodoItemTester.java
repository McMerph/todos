package ru.mcmerphy.todos.rest.server.resources.testers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.domain.TodoItem;

public class OkTodoItemTester extends ResponseTester<TodoItem> {

    public OkTodoItemTester(TodoItem expectedTodoItem) throws JsonProcessingException {
        super(expectedTodoItem);

        setJsonBody(new ObjectMapper().writeValueAsString(expectedTodoItem));
        setExpectedStatusCode(HttpStatus.SC_OK);
        setClazz(TodoItem.class);
    }

}
