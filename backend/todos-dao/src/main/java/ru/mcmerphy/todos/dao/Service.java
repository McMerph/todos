package ru.mcmerphy.todos.dao;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;
import java.util.List;

public abstract class Service<T> {

    private static final Logger logger = LogManager.getLogger("akz-dao");

    @PersistenceContext
    private EntityManager entityManager;

    private final Class<T> entityClass;

    CriteriaBuilder criteriaBuilder;
    CriteriaQuery<T> criteriaQuery;
    Root<T> root;

    Service(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    public T create(T entity) {
        entityManager.persist(entity);
        logger.info("Entity " + entity + " persisted", entity);
        return entity;
    }

    void edit(T entity) {
        entityManager.merge(entity);
        logger.info("Entity " + entity + " merged", entity);
    }

    public void remove(T entity) {
        entityManager.remove(entityManager.merge(entity));
        logger.info("Entity " + entity + " removed", entity);
    }

    public T find(Long id) {
        logger.info("Search of " + entityClass + " with id=" + id, id);
        return entityManager.find(entityClass, id);
    }

    public List<T> findAll() {
        inititializeCriteriaRequest();
        criteriaQuery.select(root);
        logger.info("Find entities of " + entityClass, entityClass);
        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    public List<T> findRange(int firstResult, int maxResults) {
        inititializeCriteriaRequest();
        return findRange(criteriaQuery, firstResult, maxResults);
    }

    public int count() {
        inititializeCriteriaRequest();
        criteriaQuery.select((Selection<T>) criteriaBuilder.count(root));
        return count(criteriaQuery);
    }

    public CriteriaBuilder getCriteriaBuilder() {
        return criteriaBuilder;
    }

    public Root<T> getRoot() {
        return root;
    }

    public void inititializeCriteriaRequest() {
        criteriaBuilder = entityManager.getCriteriaBuilder();
        criteriaQuery = (CriteriaQuery<T>) criteriaBuilder.createQuery();
        root = criteriaQuery.from(entityClass);
    }

    List<T> findRange(CriteriaQuery<T> criteriaQuery, int firstResult, int maxResults) {
        Query query = entityManager.createQuery(criteriaQuery);
        query.setFirstResult(firstResult);
        query.setMaxResults(maxResults);
        logger.info("Find " + maxResults + " entities of " + entityClass + " from " + firstResult, entityClass);
        return (List<T>) query.getResultList();
    }

    private int count(CriteriaQuery<T> criteriaQuery) {
        Query query = entityManager.createQuery(criteriaQuery);
        logger.info("Count entities of " + entityClass, entityClass);
        return ((Long) query.getSingleResult()).intValue();
    }

}
