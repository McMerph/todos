package ru.mcmerphy.todos.rest.server;

import ru.mcmerphy.todos.domain.TodoItem;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement
public class SearchResponse {

    private int count;
    private List<TodoItem> todoItems = new ArrayList<>();

    public SearchResponse() {
    }

    public SearchResponse(int count, List<TodoItem> todoItems) {
        this.count = count;
        this.todoItems = todoItems;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<TodoItem> getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(List<TodoItem> todoItems) {
        this.todoItems = todoItems;
    }

}
