package ru.mcmerphy.todos.rest.server.resources.testers;

public interface RequestError {

    String NON_INTEGER_FIRST_RESULT_QUERY_PARAMETER = "Query parameter 'firstResult' should be integer";
    String NON_INTEGER_MAX_RESULTS_QUERY_PARAMETER = "Query parameter 'maxResults' should be integer";

    String NON_INTEGER_ID_IN_PATH = "Todo item id should be integer";

    String EMPTY_TODO_ITEM = "Empty todo item";
    String TEXT_FIELD_IS_EMPTY = "Text field is empty";
    String COMPLETED_FIELD_IS_EMPTY = "Completed field is empty";

    String NOT_FOUND = "Not Found";
    String NOT_FOUND_PREFIX = "Todo item with id=";
    String NOT_FOUND_SUFFIX = " not found in database";

    String SYNC_INVALID_ARRAY = "Error deserializing object from entity stream.";

}
