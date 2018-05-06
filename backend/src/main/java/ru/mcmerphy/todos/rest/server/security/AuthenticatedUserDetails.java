package ru.mcmerphy.todos.rest.server.security;

import ru.mcmerphy.todos.domain.Authority;

import java.security.Principal;
import java.util.Collections;
import java.util.Set;

/**
 * {@link Principal} implementation with a set of {@link Authority}.
 */
public final class AuthenticatedUserDetails implements Principal {

    private final String username;
    private final Set<Authority> authorities;

    public AuthenticatedUserDetails(String username, Set<Authority> authorities) {
        this.username = username;
        this.authorities = Collections.unmodifiableSet(authorities);
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return username;
    }

}