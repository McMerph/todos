package ru.mcmerphy.todos.dao;

public class UserNotFoundException extends Exception {

    private final String userName;

    UserNotFoundException(String userName) {
        super();
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

}
