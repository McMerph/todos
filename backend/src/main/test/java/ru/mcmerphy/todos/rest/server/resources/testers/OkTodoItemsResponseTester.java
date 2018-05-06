package ru.mcmerphy.todos.rest.server.resources.testers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.rest.server.entities.TodoItemsResponse;

public class OkTodoItemsResponseTester extends ResponseTester<TodoItemsResponse> {

    public OkTodoItemsResponseTester(TodoItemsResponse expectedTodoItemsResponse) throws JsonProcessingException {
        super(expectedTodoItemsResponse);

        setJsonBody(new ObjectMapper().writeValueAsString(expectedTodoItemsResponse));
        setExpectedStatusCode(HttpStatus.SC_OK);
        setClazz(TodoItemsResponse.class);
    }

}
