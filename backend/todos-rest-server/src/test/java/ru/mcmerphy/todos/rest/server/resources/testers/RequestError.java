package ru.mcmerphy.todos.rest.server.resources.testers;

public interface RequestError {

    String INCOMPLETE_QUERY_PARAMETERS = "Please provide 'firstResult' and 'maxResults' query parameters";
    String NON_INTEGER_FIRST_RESULT_QUERY_PARAMETER = "Query parameter 'firstResult' should be integer";
    String NON_INTEGER_MAX_RESULTS_QUERY_PARAMETER = "Query parameter 'maxResults' should be integer";

    String NON_INTEGER_ID_IN_PATH = "Todo item id from request path should be integer";
    String TOO_MANY_PATHS = "Too many paths in request. Please provide single integer path for todo item";

    String EMPTY_TODO_ITEM = "Empty todo item";
    String TEXT_FIELD_IS_EMPTY = "Text field is empty";
    String COMPLETED_FIELD_IS_EMPTY = "Completed field is empty";

    String NOT_FOUND_PREFIX = "Todo item with id=";
    String NOT_FOUND_SUFFIX = " not found in database";

}
