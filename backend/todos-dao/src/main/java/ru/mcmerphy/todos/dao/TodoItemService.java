package ru.mcmerphy.todos.dao;

import ru.mcmerphy.todos.domain.TodoItem;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Stateless
public class TodoItemService extends Service<TodoItem> {

    @PersistenceContext
    private EntityManager entityManager;

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
        existedTodoItem.setCompleted(todoItem.getCompleted());
        existedTodoItem.setText(todoItem.getText());
        super.update(existedTodoItem);

        return existedTodoItem;
    }

    public Set<TodoItem> sync(List<TodoItem> todoItems) {
        Set<TodoItem> databaseItems = todoItems.stream().
                filter(todo -> Objects.nonNull(todo.getId())).
                filter(todo -> Objects.nonNull(super.find(todo.getId()))).
                collect(Collectors.toSet());
        super.findAll().stream()
                .filter(todoItem -> !databaseItems.contains(todoItem))
                .forEach(super::remove);
        Set<TodoItem> newItems = todoItems.stream()
                .filter(todo -> !databaseItems.contains(todo))
                .collect(Collectors.toSet());

        Set<TodoItem> set = new HashSet<>();
        databaseItems.forEach(entity -> set.add(update(entity)));
        newItems.forEach(entity -> set.add(create(entity)));

        return set;
    }

    @Override
    protected EntityManager getEntityManager() {
        return entityManager;
    }

}
