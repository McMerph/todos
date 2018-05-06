package ru.mcmerphy.todos.rest.server.validators;

import ru.mcmerphy.todos.domain.TodoItem;
import ru.mcmerphy.todos.rest.server.entities.ErrorMessage;
import ru.mcmerphy.todos.rest.server.exceptions.RequestParametersException;

import javax.ejb.Stateless;
import java.util.Objects;

/**
 * Component for validating todo-item.
 */
@Stateless
public class TodoItemValidator {

    public void validate(TodoItem todoItem) throws RequestParametersException {
        ErrorMessage errorMessage = new ErrorMessage();

        if (Objects.isNull(todoItem)) {
            errorMessage.add("Empty todo item");
        } else {
            if (Objects.isNull(todoItem.getText())) {
                errorMessage.add("Text field is empty");
            }
            if (Objects.isNull(todoItem.getCompleted())) {
                errorMessage.add("Completed field is empty");
            }
        }

        if (!errorMessage.isEmpty()) {
            throw new RequestParametersException(errorMessage);
        }
    }

}
