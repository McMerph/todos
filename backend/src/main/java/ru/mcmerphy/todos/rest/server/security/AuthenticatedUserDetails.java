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
    private final AuthenticationTokenDetails authenticationTokenDetails;

    public AuthenticatedUserDetails(
            String username,
            Set<Authority> authorities,
            AuthenticationTokenDetails authenticationTokenDetails
    ) {
        this.username = username;
        this.authorities = Collections.unmodifiableSet(authorities);
        this.authenticationTokenDetails = authenticationTokenDetails;
    }

    public String getUsername() {
        return username;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public AuthenticationTokenDetails getAuthenticationTokenDetails() {
        return authenticationTokenDetails;
    }

    @Override
    public String getName() {
        return username;
    }

}
