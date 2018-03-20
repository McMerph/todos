package ru.mcmerphy.todos.rest.server.resources;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.*;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertThat;

public class ResponseTester<T> {

    private String uri;
    private Set<BasicNameValuePair> queryParameters = new HashSet<>();
    private String jsonBody;
    private int expectedStatusCode;
    private T expectedResource;
    private Class<T> clazz;

    public ResponseTester<T> setUri(String uri) {
        this.uri = uri;
        return this;
    }

    public ResponseTester<T> addQueryParameter(BasicNameValuePair queryParameter) {
        queryParameters.add(queryParameter);
        return this;
    }

    public ResponseTester<T> setQueryParameters(Set<BasicNameValuePair> queryParameters) {
        this.queryParameters = queryParameters;
        return this;
    }

    public ResponseTester<T> setJsonBody(String jsonBody) {
        this.jsonBody = jsonBody;
        return this;
    }

    public ResponseTester<T> setExpectedStatusCode(int expectedStatusCode) {
        this.expectedStatusCode = expectedStatusCode;
        return this;
    }

    public ResponseTester<T> setExpectedResource(T expectedResource) {
        this.expectedResource = expectedResource;
        return this;
    }

    public ResponseTester<T> setClazz(Class<T> clazz) {
        this.clazz = clazz;
        return this;
    }

    public T testPostMethod() throws IOException, URISyntaxException {
        HttpPost postMethod = new HttpPost(this.generateUri());
        if (Objects.nonNull(this.jsonBody)) {
            postMethod.setEntity(new StringEntity(this.jsonBody, ContentType.APPLICATION_JSON));
        }
        return test(postMethod);
    }

    public T testGetMethod() throws IOException, URISyntaxException {
        return test(new HttpGet(this.generateUri()));
    }

    public T testPutMethod() throws IOException, URISyntaxException {
        HttpPut putMethod = new HttpPut(this.generateUri());
        if (Objects.nonNull(this.jsonBody)) {
            putMethod.setEntity(new StringEntity(this.jsonBody, ContentType.APPLICATION_JSON));
        }
        return test(putMethod);
    }

    public T testDeleteMethod() throws IOException, URISyntaxException {
        return test(new HttpDelete(this.generateUri()));
    }

    private URI generateUri() throws URISyntaxException {
        URIBuilder builder = new URIBuilder(this.uri);
        queryParameters.forEach(parameter -> builder.setParameter(parameter.getName(), parameter.getValue()));
        return builder.build();
    }

    private T test(HttpUriRequest request) throws IOException {
        HttpResponse response = HttpClientBuilder.create().build().execute(request);
        String jsonFromResponse = EntityUtils.toString(response.getEntity());
        ObjectMapper mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        T resource = mapper.readValue(jsonFromResponse, clazz);

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        assertThat(ContentType.getOrDefault(response.getEntity()).getMimeType(), equalTo("application/json"));
        assertThat(resource, equalTo(expectedResource));

        return resource;
    }

}
