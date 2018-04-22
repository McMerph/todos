package ru.mcmerphy.todos.dao;

import ru.mcmerphy.todos.domain.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.validation.constraints.NotNull;

@Stateless
public class UserService extends Service<User> {

    @PersistenceContext
    private EntityManager entityManager;

    public UserService() {
        super(User.class);
    }

    public User findUserByName(@NotNull final String name) {
        CriteriaBuilder builder = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<User> criteria = builder.createQuery(User.class);
        Root<User> from = criteria.from(User.class);
        criteria.select(from);
        criteria.where(builder.equal(from.get("username"), name));
        TypedQuery<User> typed = getEntityManager().createQuery(criteria);
        try {
            return typed.getSingleResult();
        } catch (final NoResultException e) {
            return null;
        }
    }

    @Override
    protected EntityManager getEntityManager() {
        return entityManager;
    }

}
