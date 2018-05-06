package ru.mcmerphy.todos.rest.server.entities;

import javax.ws.rs.QueryParam;

public class SearchRequest {

    @QueryParam("firstResult")
    private Integer firstResult;

    @QueryParam("maxResults")
    private Integer maxResults;

    public Integer getFirstResult() {
        return firstResult;
    }

    public void setFirstResult(Integer firstResult) {
        this.firstResult = firstResult;
    }

    public Integer getMaxResults() {
        return maxResults;
    }

    public void setMaxResults(Integer maxResults) {
        this.maxResults = maxResults;
    }

}
