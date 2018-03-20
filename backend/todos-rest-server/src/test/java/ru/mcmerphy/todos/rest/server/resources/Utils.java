package ru.mcmerphy.todos.rest.server.resources;

import org.apache.http.client.methods.HttpDelete;
import org.apache.http.impl.client.HttpClientBuilder;
import ru.mcmerphy.todos.domain.TodoItem;
import ru.mcmerphy.todos.rest.server.resources.testers.CreateTodoItemTester;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Collection;

class Utils {

    static final String ROOT_URI = "http://localhost:48702/todos-webapi/";

    static void deleteAll() throws IOException {
        HttpClientBuilder.create().build().execute(new HttpDelete(ROOT_URI));
    }

    static long addTodoItem(TodoItem todoItem) throws IOException, URISyntaxException {
        return new CreateTodoItemTester(todoItem)
                .setUri(ROOT_URI)
                .testPostMethod()
                .getId();
    }

    static void addTodoItems(Collection<TodoItem> todoItems) throws IOException, URISyntaxException {
        for (TodoItem todoItem : todoItems) {
            addTodoItem(todoItem);
        }
    }

}
