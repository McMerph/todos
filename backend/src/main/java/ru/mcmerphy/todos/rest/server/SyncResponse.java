package ru.mcmerphy.todos.rest.server;

import ru.mcmerphy.todos.domain.TodoItem;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@XmlRootElement
public class SyncResponse {

    private Set<TodoItem> todoItems = new HashSet<>();

    public SyncResponse() {
    }

    public SyncResponse(Set<TodoItem> todoItems) {
        this.todoItems = todoItems;
    }

    public Set<TodoItem> getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(Set<TodoItem> todoItems) {
        this.todoItems = todoItems;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SyncResponse that = (SyncResponse) o;
        return Objects.equals(todoItems, that.todoItems);
    }

    @Override
    public int hashCode() {

        return Objects.hash(todoItems);
    }

    @Override
    public String toString() {
        return "SyncResponse{" +
                "todoItems=" + todoItems +
                '}';
    }

}
