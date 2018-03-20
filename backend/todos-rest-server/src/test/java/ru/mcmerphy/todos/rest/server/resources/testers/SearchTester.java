package ru.mcmerphy.todos.rest.server.resources.testers;

import org.apache.http.message.BasicNameValuePair;

public abstract class SearchTester<T> extends ResponseTester<T> {

    SearchTester(T expectedResource) {
        super(expectedResource);
    }

    public SearchTester<T> addFirstResult(String firstResult) {
        addQueryParameter(new BasicNameValuePair("firstResult", firstResult));
        return this;
    }

    public SearchTester<T> addMaxResults(String maxResults) {
        addQueryParameter(new BasicNameValuePair("maxResults", maxResults));
        return this;
    }

}
