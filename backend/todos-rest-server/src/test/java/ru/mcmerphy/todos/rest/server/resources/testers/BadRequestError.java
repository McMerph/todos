package ru.mcmerphy.todos.rest.server.resources.testers;

import java.util.Collections;
import java.util.Set;

public enum BadRequestError {
    TO_CREATE {
        @Override
        Set<String> getErrors() {
            return Collections.singleton("Service for creating todo-items is available at root. Please provide 'text': 'string' and 'completed': 'boolean' fields in json body");
        }
    },
    TO_UPDATE {
        @Override
        Set<String> getErrors() {
            return Collections.singleton("Service for updating todo-items is available at root/{id}. Please provide 'text': 'string' and 'completed': 'boolean' fields in json body");
        }
    };

    abstract Set<String> getErrors();
}
