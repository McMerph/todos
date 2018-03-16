package ru.mcmerphy.todos.dao;

public class TodoItemNotFoundException extends Exception {

    private final long id;

    TodoItemNotFoundException(long id) {
        super();
        this.id = id;
    }

    public long getId() {
        return id;
    }

}
