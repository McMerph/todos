package ru.mcmerphy.todos.rest.server.entities;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@XmlRootElement
public class ErrorMessage {

    private Set<String> errorMessages = new HashSet<>();

    public ErrorMessage() {
    }

    public ErrorMessage(String errorMessage) {
        this();
        this.errorMessages.add(errorMessage);
    }

    public ErrorMessage(Set<String> errorMessages) {
        this();
        this.errorMessages = errorMessages;
    }

    public void add(String error) {
        this.errorMessages.add(error);
    }

    public boolean isEmpty() {
        return this.errorMessages.isEmpty();
    }

    public Set<String> getErrorMessages() {
        return errorMessages;
    }

    public void setErrorMessages(Set<String> errorMessages) {
        this.errorMessages = errorMessages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ErrorMessage that = (ErrorMessage) o;
        return Objects.equals(errorMessages, that.errorMessages);
    }

    @Override
    public int hashCode() {
        return Objects.hash(errorMessages);
    }

}
