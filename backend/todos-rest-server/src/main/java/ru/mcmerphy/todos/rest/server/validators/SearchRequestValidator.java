package ru.mcmerphy.todos.rest.server.validators;

import ru.mcmerphy.todos.rest.server.ErrorMessage;
import ru.mcmerphy.todos.rest.server.SearchRequest;

import javax.ejb.Stateless;
import java.util.Objects;

@Stateless
public class SearchRequestValidator {

    public void validate(SearchRequest searchRequest) throws RequestParametersException {
        ErrorMessage errorMessage = new ErrorMessage();

        if (Objects.isNull(searchRequest)) {
            errorMessage.add("Empty search request");
        } else {
            if (Objects.isNull(searchRequest.getFirstResult())) {
                errorMessage.add("Query parameter 'firstResult' should be integer");
            }
            if (Objects.isNull(searchRequest.getMaxResults())) {
                errorMessage.add("Query parameter 'maxResults' should be integer");
            }
        }

        if (!errorMessage.isEmpty()) {
            throw new RequestParametersException(errorMessage);
        }
    }

}
