package ru.mcmerphy.todos.rest.server.resources;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import ru.mcmerphy.todos.domain.TodoItem;
import ru.mcmerphy.todos.rest.server.ErrorMessage;
import ru.mcmerphy.todos.rest.server.SearchResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertThat;

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
    public void testCreate() throws IOException {
        testRequest(
                new HttpPost(ROOT_URI),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Please provide 'text': 'string' and 'completed': 'boolean' fields in json body"),
                ErrorMessage.class);
        testRequest(
                generateCreateRequest("{\"text\":\"Text content of todo-item\"}"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Please provide 'text': 'string' and 'completed': 'boolean' fields in json body"),
                ErrorMessage.class);
        testRequest(
                generateCreateRequest("{\"completed\":false}"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Please provide 'text': 'string' and 'completed': 'boolean' fields in json body"),
                ErrorMessage.class);

        testRequest(
                generateCreateRequest("{\"text\":\"Text content of todo-item\",\"completed\":false}"),
                HttpStatus.SC_CREATED,
                new TodoItem("Text content of todo-item", false),
                TodoItem.class);
        testRequest(
                generateCreateRequest("{\"text\":\"Text content of todo-item\",\"completed\":true}"),
                HttpStatus.SC_CREATED,
                new TodoItem("Text content of todo-item", true),
                TodoItem.class);
    }

    @Test
    public void testRead() throws IOException {
        testRequest(
                new HttpGet(ROOT_URI),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Please provide 'firstResult' and 'maxResults' query parameters"),
                ErrorMessage.class);
        testRequest(
                new HttpGet(ROOT_URI + "?firstResult=0"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Please provide 'firstResult' and 'maxResults' query parameters"),
                ErrorMessage.class);
        testRequest(
                new HttpGet(ROOT_URI + "?maxResults=10"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Please provide 'firstResult' and 'maxResults' query parameters"),
                ErrorMessage.class);
        testRequest(
                new HttpGet(ROOT_URI + "?firstResult=asd"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Please provide 'firstResult' and 'maxResults' query parameters"),
                ErrorMessage.class);
        testRequest(
                new HttpGet(ROOT_URI + "?maxResults=qwe"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Please provide 'firstResult' and 'maxResults' query parameters"),
                ErrorMessage.class);

        testRequest(
                new HttpGet(ROOT_URI + "?firstResult=asd&maxResults=10"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Query parameter 'firstResult' should be integer"),
                ErrorMessage.class);
        testRequest(
                new HttpGet(ROOT_URI + "?firstResult=0&maxResults=asd"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Query parameter 'maxResults' should be integer"),
                ErrorMessage.class);
        testRequest(
                new HttpGet(ROOT_URI + "?firstResult=asd&maxResults=asd"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage(new HashSet<>(Arrays.asList(
                        "Query parameter 'firstResult' should be integer",
                        "Query parameter 'maxResults' should be integer"))),
                ErrorMessage.class);

        testRequest(
                new HttpGet(ROOT_URI + "asd"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Todo item id from request path should be integer"),
                ErrorMessage.class);

        testRequest(
                new HttpGet(ROOT_URI + "asd/1"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Too many paths in request. Please provide single integer path for todo item"),
                ErrorMessage.class);
        testRequest(
                new HttpGet(ROOT_URI + "1/asd"),
                HttpStatus.SC_BAD_REQUEST,
                new ErrorMessage("Too many paths in request. Please provide single integer path for todo item"),
                ErrorMessage.class);

        testRequest(
                new HttpGet(ROOT_URI + "?firstResult=0&maxResults=10"),
                HttpStatus.SC_OK,
                new SearchResponse(0, new ArrayList<>()),
                SearchResponse.class);

        List<TodoItem> todoItems = new ArrayList<>();
        for (int i = 0; i < 15; i++) {
            TodoItem cratedTodoItem = createTodoItem(String.valueOf(i));
            todoItems.add(cratedTodoItem);
        }
        testRequest(
                new HttpGet(ROOT_URI + "?firstResult=0&maxResults=10"),
                HttpStatus.SC_OK,
                new SearchResponse(15, todoItems.subList(0, 10)),
                SearchResponse.class);
        testRequest(
                new HttpGet(ROOT_URI + "?firstResult=7&maxResults=10"),
                HttpStatus.SC_OK,
                new SearchResponse(15, todoItems.subList(7, todoItems.size())),
                SearchResponse.class);
    }

    private TodoItem createTodoItem(String text) throws IOException {
        TodoItem todoItem = new TodoItem(text, false);
        String json = new ObjectMapper().writeValueAsString(todoItem);
        HttpClientBuilder.create().build().execute(generateCreateRequest(json));

        return todoItem;
    }

    private HttpUriRequest generateCreateRequest(String json) {
        HttpPost postMethod = new HttpPost(ROOT_URI);
        StringEntity entity = new StringEntity(json, ContentType.APPLICATION_JSON);
        postMethod.setEntity(entity);

        return postMethod;
    }

    private <T> void testRequest(HttpUriRequest request, int expectedStatusCode, T expectedResource, Class<T> clazz)
            throws IOException {
        HttpResponse response = HttpClientBuilder.create().build().execute(request);
        String jsonFromResponse = EntityUtils.toString(response.getEntity());
        ObjectMapper mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        assertThat(ContentType.getOrDefault(response.getEntity()).getMimeType(), equalTo("application/json"));
        assertThat(mapper.readValue(jsonFromResponse, clazz), equalTo(expectedResource));
    }

}
