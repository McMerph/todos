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

@Stateless
public class UserService extends Service<User> {

    @PersistenceContext
    private EntityManager entityManager;

    public UserService() {
        super(User.class);
    }

    public User findUserByName(String name) throws UserNotFoundException {
        CriteriaBuilder builder = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<User> criteria = builder.createQuery(User.class);
        Root<User> from = criteria.from(User.class);
        criteria.select(from);
        criteria.where(builder.equal(from.get("username"), name));
        TypedQuery<User> typed = getEntityManager().createQuery(criteria);
        try {
            return typed.getSingleResult();
        } catch (final NoResultException e) {
            throw new UserNotFoundException(name);
        }
    }

    @Override
    protected EntityManager getEntityManager() {
        return entityManager;
    }

}
