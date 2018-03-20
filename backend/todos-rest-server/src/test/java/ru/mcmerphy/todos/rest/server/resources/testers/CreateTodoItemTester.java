package ru.mcmerphy.todos.rest.server.resources.testers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.domain.TodoItem;

public class CreateTodoItemTester extends ResponseTester<TodoItem> {

    public CreateTodoItemTester(TodoItem expectedTodoItem) throws JsonProcessingException {
        super(expectedTodoItem);

        setJsonBody(new ObjectMapper().writeValueAsString(expectedTodoItem));
        setExpectedStatusCode(HttpStatus.SC_CREATED);
        setClazz(TodoItem.class);
    }

}
