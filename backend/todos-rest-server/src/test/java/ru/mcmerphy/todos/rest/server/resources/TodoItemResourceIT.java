package ru.mcmerphy.todos.rest.server.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import ru.mcmerphy.todos.domain.TodoItem;
import ru.mcmerphy.todos.rest.server.SearchResponse;
import ru.mcmerphy.todos.rest.server.resources.testers.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;
import static ru.mcmerphy.todos.rest.server.resources.Utils.*;

public class TodoItemResourceIT {

    @Before
    public void before() throws IOException {
        deleteAll();
    }

    @AfterClass
    public static void afterClass() throws IOException {
        deleteAll();
    }

    @Test
    public void testCreate() throws IOException, URISyntaxException {
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.EMPTY_TODO_ITEM)
                .testPostMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.TEXT_FIELD_IS_EMPTY)
                .addExpectedError(RequestError.COMPLETED_FIELD_IS_EMPTY)
                .setJsonBody("{\"valid\":\"true\"}")
                .testPostMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.COMPLETED_FIELD_IS_EMPTY)
                .setJsonBody("{\"text\":\"Text content of todo-item\"}")
                .testPostMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.TEXT_FIELD_IS_EMPTY)
                .setJsonBody("{\"completed\":false}")
                .testPostMethod();

        new CreatedTodoItemTester(new TodoItem("Text of incomplete item", false))
                .setUri(ROOT_URI)
                .testPostMethod();
        new CreatedTodoItemTester(new TodoItem("Text of completed item", true))
                .setUri(ROOT_URI)
                .testPostMethod();
    }

    @Test
    public void testBatchRead() throws IOException, URISyntaxException {
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.INCOMPLETE_QUERY_PARAMETERS)
                .testGetMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.INCOMPLETE_QUERY_PARAMETERS)
                .addFirstResultQueryParameter("0")
                .testGetMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.INCOMPLETE_QUERY_PARAMETERS)
                .addFirstResultQueryParameter("asd")
                .testGetMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.INCOMPLETE_QUERY_PARAMETERS)
                .addMaxResultsQueryParameter("10")
                .testGetMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.INCOMPLETE_QUERY_PARAMETERS)
                .addMaxResultsQueryParameter("qwe")
                .testGetMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.NON_INTEGER_FIRST_RESULT_QUERY_PARAMETER)
                .addFirstResultQueryParameter("asd")
                .addMaxResultsQueryParameter("10")
                .testGetMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.NON_INTEGER_MAX_RESULTS_QUERY_PARAMETER)
                .addFirstResultQueryParameter("10")
                .addMaxResultsQueryParameter("asd")
                .testGetMethod();
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.NON_INTEGER_FIRST_RESULT_QUERY_PARAMETER)
                .addExpectedError(RequestError.NON_INTEGER_MAX_RESULTS_QUERY_PARAMETER)
                .addFirstResultQueryParameter("qwe")
                .addMaxResultsQueryParameter("asd")
                .testGetMethod();

        new OkSearchResponseTester(new SearchResponse(0, new ArrayList<>()))
                .addFirstResultQueryParameter("0")
                .addMaxResultsQueryParameter("10")
                .setUri(ROOT_URI)
                .testGetMethod();

        List<TodoItem> todoItems = IntStream.rangeClosed(0, 14).boxed()
                .map(i -> new TodoItem(String.valueOf(i), i % 2 == 0))
                .collect(Collectors.toList());
        addTodoItems(todoItems);
        new OkSearchResponseTester(new SearchResponse(15, todoItems.subList(0, 10)))
                .addFirstResultQueryParameter("0")
                .addMaxResultsQueryParameter("10")
                .setUri(ROOT_URI)
                .testGetMethod();
        new OkSearchResponseTester(new SearchResponse(15, todoItems.subList(7, todoItems.size())))
                .addFirstResultQueryParameter("7")
                .addMaxResultsQueryParameter("10")
                .setUri(ROOT_URI)
                .testGetMethod();
    }

    @Test
    public void testRead() throws IOException, URISyntaxException {
        new BadRequestTester(ROOT_URI + "asd")
                .addExpectedError(RequestError.NON_INTEGER_ID_IN_PATH)
                .testGetMethod();
        new BadRequestTester(ROOT_URI + "asd/1")
                .addExpectedError(RequestError.TOO_MANY_PATHS)
                .testGetMethod();
        new BadRequestTester(ROOT_URI + "1/asd")
                .addExpectedError(RequestError.TOO_MANY_PATHS)
                .testGetMethod();

        new NotFoundTester(1)
                .setUri(ROOT_URI + 1)
                .testGetMethod();

        TodoItem todoItem1 = new TodoItem("Text of incomplete item", false);
        long id1 = addTodoItem(todoItem1);
        new OkTodoItemTester(todoItem1)
                .setUri(ROOT_URI + id1)
                .testGetMethod();

        TodoItem todoItem2 = new TodoItem("Text of completed item", true);
        long id2 = addTodoItem(todoItem2);
        new OkTodoItemTester(todoItem2)
                .setUri(ROOT_URI + id2)
                .testGetMethod();
    }

    @Test
    public void testSync() throws IOException, URISyntaxException {
        new BadRequestTester(ROOT_URI)
                .addExpectedError(RequestError.SYNC_INVALID_ARRAY)
                .setJsonBody("{\"valid\":\"true\"}")
                .testPutMethod();

        Set<TodoItem> todoItems = IntStream.rangeClosed(0, 14).boxed()
                .map(i -> new TodoItem(String.valueOf(i), i % 2 == 0))
                .collect(Collectors.toSet());
        addTodoItems(todoItems);
        new SyncResponseTester(todoItems)
                .setUri(ROOT_URI)
                .testPutMethod();

        Set<TodoItem> updatedTodoItems = todoItems.stream()
                .filter(todoItem -> Integer.parseInt(todoItem.getText()) < 8)
                .map(todoItem -> new TodoItem("Updated " + todoItem.getText(), true))
                .collect(Collectors.toSet());
        new SyncResponseTester(updatedTodoItems)
                .setUri(ROOT_URI)
                .testPutMethod();
    }

    @Test
    public void testUpdate() throws IOException, URISyntaxException {
        new BadRequestTester(ROOT_URI + 1)
                .addExpectedError(RequestError.EMPTY_TODO_ITEM)
                .testPutMethod();
        new BadRequestTester(ROOT_URI + 1)
                .addExpectedError(RequestError.TEXT_FIELD_IS_EMPTY)
                .addExpectedError(RequestError.COMPLETED_FIELD_IS_EMPTY)
                .setJsonBody("{\"valid\":\"true\"}")
                .testPutMethod();
        new BadRequestTester(ROOT_URI + 1)
                .addExpectedError(RequestError.COMPLETED_FIELD_IS_EMPTY)
                .setJsonBody("{\"text\":\"Text content of todo-item\"}")
                .testPutMethod();
        new BadRequestTester(ROOT_URI + 1)
                .addExpectedError(RequestError.TEXT_FIELD_IS_EMPTY)
                .setJsonBody("{\"completed\":false}")
                .testPutMethod();

        TodoItem todoItem = new TodoItem("asd", true);
        String json = new ObjectMapper().writeValueAsString(todoItem);
        new BadRequestTester(ROOT_URI + "asd")
                .addExpectedError(RequestError.NON_INTEGER_ID_IN_PATH)
                .setJsonBody(json)
                .testPutMethod();
        new BadRequestTester(ROOT_URI + "asd/1")
                .addExpectedError(RequestError.TOO_MANY_PATHS)
                .setJsonBody(json)
                .testPutMethod();
        new BadRequestTester(ROOT_URI + "1/asd")
                .addExpectedError(RequestError.TOO_MANY_PATHS)
                .setJsonBody(json)
                .testPutMethod();

        new NotFoundTester(1)
                .setUri(ROOT_URI + 1)
                .setJsonBody(json)
                .testPutMethod();

        TodoItem todoItem1 = new TodoItem("Item1", false);
        long id1 = addTodoItem(todoItem1);
        TodoItem updatedTodoItem1 = new TodoItem("Updated item1", true);
        new OkTodoItemTester(updatedTodoItem1)
                .setUri(ROOT_URI + id1)
                .testPutMethod();

        TodoItem todoItem2 = new TodoItem("Item2", true);
        long id2 = addTodoItem(todoItem2);
        TodoItem updatedTodoItem2 = new TodoItem("Updated item2", true);
        new OkTodoItemTester(updatedTodoItem2)
                .setUri(ROOT_URI + id2)
                .testPutMethod();
    }

    @Test
    public void testDelete() throws IOException, URISyntaxException {
        new BadRequestTester(ROOT_URI + "asd")
                .addExpectedError(RequestError.NON_INTEGER_ID_IN_PATH)
                .testDeleteMethod();
        new BadRequestTester(ROOT_URI + "asd/1")
                .addExpectedError(RequestError.TOO_MANY_PATHS)
                .testDeleteMethod();
        new BadRequestTester(ROOT_URI + "1/asd")
                .addExpectedError(RequestError.TOO_MANY_PATHS)
                .testDeleteMethod();

        new NotFoundTester(1)
                .setUri(ROOT_URI + 1)
                .testDeleteMethod();

        TodoItem todoItem1 = new TodoItem("Text of incomplete item", false);
        long id1 = addTodoItem(todoItem1);
        new OkTodoItemTester(todoItem1)
                .setUri(ROOT_URI + id1)
                .testDeleteMethod();

        TodoItem todoItem2 = new TodoItem("Text of completed item", true);
        long id2 = addTodoItem(todoItem2);
        new OkTodoItemTester(todoItem2)
                .setUri(ROOT_URI + id2)
                .testDeleteMethod();
    }

    @Test
    public void testBatchDelete() throws IOException, URISyntaxException {
        HttpResponse response1 = HttpClientBuilder.create().build().execute(new HttpDelete(ROOT_URI));
        assertThat(response1.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_NO_CONTENT));

        List<TodoItem> todoItems = IntStream.rangeClosed(0, 14).boxed()
                .map(i -> new TodoItem(String.valueOf(i), i % 2 == 0))
                .collect(Collectors.toList());
        addTodoItems(todoItems);
        HttpResponse response2 = HttpClientBuilder.create().build().execute(new HttpDelete(ROOT_URI));
        assertThat(response2.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_NO_CONTENT));
    }

}
