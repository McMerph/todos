package ru.mcmerphy.todos.rest.server.resources.testers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpStatus;
import ru.mcmerphy.todos.rest.server.SearchResponse;

public class OkSearchResponseTester extends SearchTester<SearchResponse> {

    public OkSearchResponseTester(SearchResponse expectedSearchResponse) throws JsonProcessingException {
        super(expectedSearchResponse);

        setJsonBody(new ObjectMapper().writeValueAsString(expectedSearchResponse));
        setExpectedStatusCode(HttpStatus.SC_OK);
        setClazz(SearchResponse.class);
    }

}
