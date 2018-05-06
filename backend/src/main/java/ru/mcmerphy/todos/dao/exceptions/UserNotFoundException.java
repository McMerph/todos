package ru.mcmerphy.todos.dao.exceptions;

public class UserNotFoundException extends Exception {

    private final String userName;

    public UserNotFoundException(String userName) {
        super();
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

}
