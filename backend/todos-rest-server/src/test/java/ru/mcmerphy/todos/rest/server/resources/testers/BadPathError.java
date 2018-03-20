package ru.mcmerphy.todos.rest.server.resources.testers;

public enum BadPathError {
    NON_INTEGER {
        @Override
        String getError() {
            return "Todo item id from request path should be integer";
        }
    },
    TOO_MANY_PATHS {
        @Override
        String getError() {
            return "Too many paths in request. Please provide single integer path for todo item";
        }
    };

    abstract String getError();
}
