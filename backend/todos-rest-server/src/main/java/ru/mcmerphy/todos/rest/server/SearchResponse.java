package ru.mcmerphy.todos.rest.server;

import ru.mcmerphy.todos.domain.TodoItem;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@XmlRootElement
public class SearchResponse {

    private long count;
    private List<TodoItem> todoItems = new ArrayList<>();

    public SearchResponse() {
    }

    public SearchResponse(long count, List<TodoItem> todoItems) {
        this.count = count;
        this.todoItems = todoItems;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public List<TodoItem> getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(List<TodoItem> todoItems) {
        this.todoItems = todoItems;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SearchResponse that = (SearchResponse) o;
        return count == that.count &&
                Objects.equals(todoItems, that.todoItems);
    }

    @Override
    public int hashCode() {
        return Objects.hash(count, todoItems);
    }

    @Override
    public String toString() {
        return "SearchResponse{" +
                "count=" + count +
                ", todoItems=" + todoItems +
                '}';
    }

}
