package ru.mcmerphy.todos.dao;

import ru.mcmerphy.todos.domain.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class UserService extends Service<User> {

    @PersistenceContext
    private EntityManager entityManager;

    public UserService() {
        super(User.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return entityManager;
    }

}
