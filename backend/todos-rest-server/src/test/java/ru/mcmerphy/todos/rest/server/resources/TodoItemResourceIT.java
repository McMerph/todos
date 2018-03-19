package ru.mcmerphy.todos.rest.server.resources;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.*;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.Test;
import ru.mcmerphy.todos.rest.server.ErrorMessage;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertThat;
import static ru.mcmerphy.todos.rest.server.resources.Utils.retrieveResourceFromResponse;

public class TodoItemResourceIT {

    public enum HttpMethod {
        POST() {
            HttpUriRequest getRequest(String path) {
                return new HttpPost(path);
            }
        },
        GET() {
            HttpUriRequest getRequest(String path) {
                return new HttpGet(path);
            }
        },
        PUT() {
            HttpUriRequest getRequest(String path) {
                return new HttpPut(path);
            }
        },
        DELETE() {
            HttpUriRequest getRequest(String path) {
                return new HttpDelete(path);
            }
        };

        abstract HttpUriRequest getRequest(String path);
    }

    @Test
    public void testBadRequests() throws IOException {
        String rootUri = "http://localhost:48702/todos-webapi/";

        testBadRequest(
                HttpMethod.GET,
                rootUri,
                Collections.singleton("Please provide 'firstResult' and 'maxResults' query parameters"));
        testBadRequest(
                HttpMethod.GET,
                rootUri + "?firstResult=0",
                Collections.singleton("Please provide 'firstResult' and 'maxResults' query parameters"));
        testBadRequest(
                HttpMethod.GET,
                rootUri + "?maxResults=10",
                Collections.singleton("Please provide 'firstResult' and 'maxResults' query parameters"));
        testBadRequest(
                HttpMethod.GET,
                rootUri + "?firstResult=asd",
                Collections.singleton("Please provide 'firstResult' and 'maxResults' query parameters"));
        testBadRequest(
                HttpMethod.GET,
                rootUri + "?maxResults=qwe",
                Collections.singleton("Please provide 'firstResult' and 'maxResults' query parameters"));

        testBadRequest(
                HttpMethod.GET,
                rootUri + "?firstResult=asd&maxResults=10",
                Collections.singleton("Query parameter 'firstResult' should be integer"));
        testBadRequest(
                HttpMethod.GET,
                rootUri + "?firstResult=0&maxResults=asd",
                Collections.singleton("Query parameter 'maxResults' should be integer"));
        testBadRequest(
                HttpMethod.GET,
                rootUri + "?firstResult=asd&maxResults=asd",
                Arrays.asList(
                        "Query parameter 'firstResult' should be integer",
                        "Query parameter 'maxResults' should be integer"));

        testBadRequest(
                HttpMethod.GET,
                rootUri + "asd",
                Collections.singleton("Todo item id from request path should be integer"));

        testBadRequest(
                HttpMethod.GET,
                rootUri + "asd/1",
                Collections.singleton("Too many paths in request. Please provide single integer path for todo item"));
        testBadRequest(
                HttpMethod.GET,
                rootUri + "1/asd",
                Collections.singleton("Too many paths in request. Please provide single integer path for todo item"));
    }

    private void testBadRequest(HttpMethod method, String path, Collection<String> errors) throws IOException {
        // Given
        HttpUriRequest request = method.getRequest(path);
        int expectedStatusCode = HttpStatus.SC_BAD_REQUEST;
        String expectedMimeType = "application/json";
        ErrorMessage expectedErrorMessage = new ErrorMessage();
        errors.forEach(expectedErrorMessage::add);

        // When
        HttpResponse response = HttpClientBuilder.create().build().execute(request);

        // Then
        int statusCode = response.getStatusLine().getStatusCode();
        ErrorMessage errorMessage = retrieveResourceFromResponse(response, ErrorMessage.class);
        String mimeType = ContentType.getOrDefault(response.getEntity()).getMimeType();
        assertThat(statusCode, equalTo(expectedStatusCode));
        assertThat(mimeType, equalTo(expectedMimeType));
        assertThat(errorMessage, equalTo(expectedErrorMessage));
    }

}
