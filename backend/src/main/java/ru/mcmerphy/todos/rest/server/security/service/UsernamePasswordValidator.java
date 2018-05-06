package ru.mcmerphy.todos.rest.server.security.service;

import ru.mcmerphy.todos.dao.UserNotFoundException;
import ru.mcmerphy.todos.dao.UserService;
import ru.mcmerphy.todos.domain.User;
import ru.mcmerphy.todos.rest.server.security.service.exception.AuthenticationException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

/**
 * Component for validating user credentials.
 */
@ApplicationScoped
public class UsernamePasswordValidator {

    @Inject
    private UserService userService;

    @Inject
    private PasswordEncoder passwordEncoder;

    /**
     * Validate username and password.
     */
    public User validateCredentials(String name, String password) {

        User user = null;
        try {
            user = userService.findUserByName(name);
        } catch (UserNotFoundException e) {
            throw new AuthenticationException("User with the given name cannot be found.");
        }

        if (!user.isActive()) {
            throw new AuthenticationException("The user is inactive.");
        }

        if (!passwordEncoder.checkPassword(password, user.getPassword())) {
            throw new AuthenticationException("Invalid password.");
        }

        return user;
    }
}
