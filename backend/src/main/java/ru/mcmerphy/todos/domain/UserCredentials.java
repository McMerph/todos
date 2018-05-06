package ru.mcmerphy.todos.domain;

/**
 * API model for the user credentials.
 */
public class UserCredentials {

    private String name;
    private String password;

    public UserCredentials() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
