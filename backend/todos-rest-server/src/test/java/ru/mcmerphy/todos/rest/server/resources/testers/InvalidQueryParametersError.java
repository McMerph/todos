package ru.mcmerphy.todos.rest.server.resources.testers;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public enum InvalidQueryParametersError {
    INCOMPLETE {
        @Override
        Set<String> getErrors() {
            return Collections.singleton("Please provide 'firstResult' and 'maxResults' query parameters");
        }
    },
    NON_INTEGER_FIRST_RESULT {
        @Override
        Set<String> getErrors() {
            return Collections.singleton("Query parameter 'firstResult' should be integer");
        }
    },
    NON_INTEGER_MAX_RESULTS {
        @Override
        Set<String> getErrors() {
            return Collections.singleton("Query parameter 'maxResults' should be integer");
        }
    },
    NON_INTEGER_FIRST_RESULT_AND_MAX_RESULTS {
        @Override
        Set<String> getErrors() {
            return new HashSet<>(Arrays.asList(
                    "Query parameter 'firstResult' should be integer",
                    "Query parameter 'maxResults' should be integer"));
        }
    };

    abstract Set<String> getErrors();
}
