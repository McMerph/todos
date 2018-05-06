package ru.mcmerphy.todos.dao;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import java.util.List;

public abstract class Service<T> {

    private static final Logger logger = LogManager.getLogger("todos-dao");

    private final Class<T> entityClass;

    public Service(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    protected abstract EntityManager getEntityManager();

    public T create(T entity) {
        getEntityManager().persist(entity);

        logger.info("Entity " + entity + " persisted", entity);
        return entity;
    }

    public T find(Long id) {
        logger.info("Search of " + entityClass + " with id=" + id, id);
        return getEntityManager().find(entityClass, id);
    }

    public List<T> findAll() {
        CriteriaBuilder criteriaBuilder = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(entityClass);
        Root<T> root = criteriaQuery.from(entityClass);
        criteriaQuery.select(root);
        TypedQuery<T> query = getEntityManager().createQuery(criteriaQuery);

        logger.info("Find entities of " + entityClass, entityClass);
        return query.getResultList();
    }

    public List<T> findRange(int firstResult, int maxResults) {
        CriteriaBuilder criteriaBuilder = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(entityClass);
        Root<T> root = criteriaQuery.from(entityClass);
        TypedQuery<T> query = getEntityManager().createQuery(criteriaQuery);
        query.setFirstResult(firstResult);
        query.setMaxResults(maxResults);

        logger.info("Find " + maxResults + " entities of " + entityClass + " from " + firstResult, entityClass);
        return query.getResultList();
    }

    public T update(T entity) {
        T mergedEntity = getEntityManager().merge(entity);
        logger.info("Entity " + entity + " merged", entity);

        return mergedEntity;
    }

    public T remove(T entity) {
        getEntityManager().remove(getEntityManager().merge(entity));
        logger.info("Entity " + entity + " removed", entity);

        return entity;
    }

    public List<T> removeAll() {
        List<T> all = findAll();
        all.forEach(this::remove);

        return all;
    }

    public long count() {
        CriteriaBuilder criteriaBuilder = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<T> root = criteriaQuery.from(entityClass);
        Expression<Long> expression = criteriaBuilder.count(root);
        criteriaQuery.select(expression);
        TypedQuery<Long> query = getEntityManager().createQuery(criteriaQuery);

        logger.info("Count entities of " + entityClass, entityClass);
        return query.getSingleResult();
    }

}
