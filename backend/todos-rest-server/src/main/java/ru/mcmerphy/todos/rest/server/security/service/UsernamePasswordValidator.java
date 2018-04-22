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
            // User cannot be found with the given username/email
            throw new AuthenticationException("Bad credentials.");
        }

        if (!user.isActive()) {
            // User is not active
            throw new AuthenticationException("The user is inactive.");
        }

        if (!passwordEncoder.checkPassword(password, user.getPassword())) {
            // Invalid password
            throw new AuthenticationException("Bad credentials.");
        }

        return user;
    }
}