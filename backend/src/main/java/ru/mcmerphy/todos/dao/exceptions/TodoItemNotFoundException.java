package ru.mcmerphy.todos.dao.exceptions;

public class TodoItemNotFoundException extends Exception {

    private final long id;

    public TodoItemNotFoundException(long id) {
        super();
        this.id = id;
    }

    public long getId() {
        return id;
    }

}
