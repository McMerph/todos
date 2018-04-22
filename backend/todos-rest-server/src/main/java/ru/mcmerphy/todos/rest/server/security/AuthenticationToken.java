package ru.mcmerphy.todos.rest.server.security;

/**
 * API model for the authentication token.
 */
public class AuthenticationToken {

    private String token;

    public AuthenticationToken() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
