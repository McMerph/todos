package ru.mcmerphy.todos.dao;

import ru.mcmerphy.todos.domain.TodoItem;

import javax.ejb.Stateless;
import javax.persistence.criteria.Predicate;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Stateless
public class TodoItemService extends Service<TodoItem> {

    public TodoItemService() {
        super(TodoItem.class);
    }

    public TodoItem find(long id) throws TodoItemNotFoundException {
        TodoItem todoItem = super.find(id);
        if (Objects.isNull(todoItem)) {
            throw new TodoItemNotFoundException(id);
        }

        return todoItem;
    }

    public TodoItem update(long id, TodoItem todoItem) throws TodoItemNotFoundException {
        TodoItem existedTodoItem = find(id);
        existedTodoItem.setCompleted(todoItem.isCompleted());
        existedTodoItem.setText(todoItem.getText());

        edit(existedTodoItem);

        return existedTodoItem;
    }

    public List<TodoItem> findRange(
            int firstResult,
            int maxResults,
            Set<Predicate> predicates) {
        criteriaQuery.select(root).where(predicates.toArray(new Predicate[]{}));
        criteriaQuery.orderBy(criteriaBuilder.desc(root.get("creationDate")));

        return findRange(criteriaQuery, firstResult, maxResults);
    }

}
