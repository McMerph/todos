package ru.mcmerphy.todos.rest.server.resources.testers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.domain.TodoItem;
import ru.mcmerphy.todos.rest.server.entities.SyncResponse;

import java.util.Set;

public class SyncResponseTester extends ResponseTester<SyncResponse> {

    public SyncResponseTester(Set<TodoItem> todoItems) throws JsonProcessingException {
        super(new SyncResponse(todoItems));

        ObjectMapper mapper = new ObjectMapper();
        setJsonBody(mapper.writeValueAsString(todoItems));
        setExpectedStatusCode(HttpStatus.SC_OK);
        setClazz(SyncResponse.class);
    }

}
