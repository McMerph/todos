package ru.mcmerphy.todos.rest.server.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import ru.mcmerphy.todos.domain.TodoItem;
import ru.mcmerphy.todos.rest.server.ErrorMessage;
import ru.mcmerphy.todos.rest.server.SearchResponse;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.*;

public class TodoItemResourceIT {

    private static final String ROOT_URI = "http://localhost:48702/todos-webapi/";

    private static void deleteAll() throws IOException {
        HttpClientBuilder.create().build().execute(new HttpDelete(ROOT_URI));
    }

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
        testIncompleteCreateTodoItemRequestBody("");
        testIncompleteCreateTodoItemRequestBody("{\"text\":\"Text content of todo-item\"}");
        testIncompleteCreateTodoItemRequestBody("{\"completed\":false}");

        testSuccessCreateTodoItemRequest(new TodoItem("Text of incomplete item", false));
        testSuccessCreateTodoItemRequest(new TodoItem("Text of completed item", true));
    }

    @Test
    public void testBatchRead() throws IOException, URISyntaxException {
        testIncompleteQueryParametersBatchReadRequest(new HashSet<>());
        testIncompleteQueryParametersBatchReadRequest(
                Collections.singleton(new BasicNameValuePair("firstResult", "0")));
        testIncompleteQueryParametersBatchReadRequest(
                Collections.singleton(new BasicNameValuePair("firstResult", "asd")));
        testIncompleteQueryParametersBatchReadRequest(
                Collections.singleton(new BasicNameValuePair("maxResults", "10")));
        testIncompleteQueryParametersBatchReadRequest(
                Collections.singleton(new BasicNameValuePair("maxResults", "qwe")));

        testBadBatchReadRequest(
                new HashSet<>(Arrays.asList(
                        new BasicNameValuePair("firstResult", "asd"),
                        new BasicNameValuePair("maxResults", "10"))),
                Collections.singleton("Query parameter 'firstResult' should be integer"));
        testBadBatchReadRequest(
                new HashSet<>(Arrays.asList(
                        new BasicNameValuePair("firstResult", "0"),
                        new BasicNameValuePair("maxResults", "asd"))),
                Collections.singleton("Query parameter 'maxResults' should be integer"));
        testBadBatchReadRequest(
                new HashSet<>(Arrays.asList(
                        new BasicNameValuePair("firstResult", "qwe"),
                        new BasicNameValuePair("maxResults", "asd"))),
                new HashSet<>(Arrays.asList(
                        "Query parameter 'firstResult' should be integer",
                        "Query parameter 'maxResults' should be integer")));

        testSuccessBatchReadRequest(new HashSet<>(Arrays.asList(
                new BasicNameValuePair("firstResult", "0"),
                new BasicNameValuePair("maxResults", "10"))),
                new SearchResponse(0, new ArrayList<>()));
        List<TodoItem> todoItems = new ArrayList<>();
        for (int i = 0; i < 15; i++) {
            TodoItem todoItem = new TodoItem(String.valueOf(i), i % 2 == 0);
            testSuccessCreateTodoItemRequest(todoItem);
            todoItems.add(todoItem);
        }
        testSuccessBatchReadRequest(new HashSet<>(Arrays.asList(
                new BasicNameValuePair("firstResult", "0"),
                new BasicNameValuePair("maxResults", "10"))),
                new SearchResponse(15, todoItems.subList(0, 10)));
        testSuccessBatchReadRequest(new HashSet<>(Arrays.asList(
                new BasicNameValuePair("firstResult", "7"),
                new BasicNameValuePair("maxResults", "10"))),
                new SearchResponse(15, todoItems.subList(7, todoItems.size())));
    }

    @Test
    public void testRead() throws IOException, URISyntaxException {
        testBadReadRequest("asd", Collections.singleton(
                "Todo item id from request path should be integer"));
        testBadReadRequest("asd/1", Collections.singleton(
                "Too many paths in request. Please provide single integer path for todo item"));
        testBadReadRequest("1/asd", Collections.singleton(
                "Too many paths in request. Please provide single integer path for todo item"));

        testNotFoundReadRequest(1, Collections.singleton("Todo item with id=1 not found in database"));

        TodoItem incompleteTodoItem = testSuccessCreateTodoItemRequest(
                new TodoItem("Text of incomplete item", false));
        TodoItem completedTodoItem = testSuccessCreateTodoItemRequest(
                new TodoItem("Text of completed item", true));
        testSuccessReadRequest(incompleteTodoItem.getId(), incompleteTodoItem);
        testSuccessReadRequest(completedTodoItem.getId(), completedTodoItem);
    }

    private void testIncompleteCreateTodoItemRequestBody(String json)
            throws IOException, URISyntaxException {
        new ResponseTester<ErrorMessage>()
                .setUri(ROOT_URI)
                .setJsonBody(json)
                .setExpectedStatusCode(HttpStatus.SC_BAD_REQUEST)
                .setExpectedResource(new ErrorMessage(
                        "Please provide 'text': 'string' and 'completed': 'boolean' fields in json body"))
                .setClazz(ErrorMessage.class)
                .testPostMethod();
    }

    private TodoItem testSuccessCreateTodoItemRequest(TodoItem expectedTodoItem)
            throws IOException, URISyntaxException {
        return new ResponseTester<TodoItem>()
                .setUri(ROOT_URI)
                .setJsonBody(new ObjectMapper().writeValueAsString(expectedTodoItem))
                .setExpectedStatusCode(HttpStatus.SC_CREATED)
                .setExpectedResource(expectedTodoItem)
                .setClazz(TodoItem.class)
                .testPostMethod();
    }

    private void testIncompleteQueryParametersBatchReadRequest(Set<BasicNameValuePair> queryParameters)
            throws IOException, URISyntaxException {
        testBadBatchReadRequest(queryParameters, Collections.singleton(
                "Please provide 'firstResult' and 'maxResults' query parameters"));
    }

    private void testBadBatchReadRequest(Set<BasicNameValuePair> queryParameters, Set<String> expectedErrors)
            throws IOException, URISyntaxException {
        new ResponseTester<ErrorMessage>()
                .setUri(ROOT_URI)
                .setQueryParameters(queryParameters)
                .setExpectedStatusCode(HttpStatus.SC_BAD_REQUEST)
                .setExpectedResource(new ErrorMessage(expectedErrors))
                .setClazz(ErrorMessage.class)
                .testGetMethod();
    }

    private void testSuccessBatchReadRequest(
            Set<BasicNameValuePair> queryParameters,
            SearchResponse expectedSearchResponse)
            throws IOException, URISyntaxException {
        new ResponseTester<SearchResponse>()
                .setUri(ROOT_URI)
                .setQueryParameters(queryParameters)
                .setExpectedStatusCode(HttpStatus.SC_OK)
                .setExpectedResource(expectedSearchResponse)
                .setClazz(SearchResponse.class)
                .testGetMethod();
    }

    private void testBadReadRequest(String pathSuffix, Set<String> expectedErrors)
            throws IOException, URISyntaxException {
        new ResponseTester<ErrorMessage>()
                .setUri(ROOT_URI + pathSuffix)
                .setExpectedStatusCode(HttpStatus.SC_BAD_REQUEST)
                .setExpectedResource(new ErrorMessage(expectedErrors))
                .setClazz(ErrorMessage.class)
                .testGetMethod();
    }

    private void testNotFoundReadRequest(long id, Set<String> expectedErrors)
            throws IOException, URISyntaxException {
        new ResponseTester<ErrorMessage>()
                .setUri(ROOT_URI + id)
                .setExpectedStatusCode(HttpStatus.SC_NOT_FOUND)
                .setExpectedResource(new ErrorMessage(expectedErrors))
                .setClazz(ErrorMessage.class)
                .testGetMethod();
    }

    private void testSuccessReadRequest(long id, TodoItem expectedTodoItem)
            throws IOException, URISyntaxException {
        new ResponseTester<TodoItem>()
                .setUri(ROOT_URI + id)
                .setExpectedStatusCode(HttpStatus.SC_OK)
                .setExpectedResource(expectedTodoItem)
                .setClazz(TodoItem.class)
                .testGetMethod();
    }

}
