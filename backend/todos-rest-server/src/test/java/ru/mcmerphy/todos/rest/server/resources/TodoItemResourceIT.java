package ru.mcmerphy.todos.rest.server.resources;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import ru.mcmerphy.todos.domain.TodoItem;
import ru.mcmerphy.todos.rest.server.SearchResponse;
import ru.mcmerphy.todos.rest.server.resources.testers.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static ru.mcmerphy.todos.rest.server.resources.Utils.*;

public class TodoItemResourceIT {

    @Before
    public void before() throws IOException {
        deleteAll();
    }

    @AfterClass
    public static void afterClass() throws IOException {
        deleteAll();
    }

    @Test
    public void testCreate() throws IOException, URISyntaxException {
        new IncompleteRequestBodyTester(null)
                .setUri(ROOT_URI).testPostMethod();
        new IncompleteRequestBodyTester("{\"text\":\"Text content of todo-item\"}")
                .setUri(ROOT_URI).testPostMethod();
        new IncompleteRequestBodyTester("{\"completed\":false}")
                .setUri(ROOT_URI).testPostMethod();

        new CreateTodoItemTester(new TodoItem("Text of incomplete item", false))
                .setUri(ROOT_URI).testPostMethod();
        new CreateTodoItemTester(new TodoItem("Text of completed item", true))
                .setUri(ROOT_URI).testPostMethod();
    }

    @Test
    public void testBatchRead() throws IOException, URISyntaxException {
        new InvalidQueryParametersTester(InvalidQueryParametersError.INCOMPLETE)
                .setUri(ROOT_URI).testGetMethod();
        new InvalidQueryParametersTester(InvalidQueryParametersError.INCOMPLETE)
                .addFirstResult("0").setUri(ROOT_URI).testGetMethod();
        new InvalidQueryParametersTester(InvalidQueryParametersError.INCOMPLETE)
                .addFirstResult("asd").setUri(ROOT_URI).testGetMethod();
        new InvalidQueryParametersTester(InvalidQueryParametersError.INCOMPLETE)
                .addMaxResults("10").setUri(ROOT_URI).testGetMethod();
        new InvalidQueryParametersTester(InvalidQueryParametersError.INCOMPLETE)
                .addMaxResults("qwe").setUri(ROOT_URI).testGetMethod();
        new InvalidQueryParametersTester(InvalidQueryParametersError.NON_INTEGER_FIRST_RESULT)
                .addFirstResult("asd").addMaxResults("10").setUri(ROOT_URI).testGetMethod();
        new InvalidQueryParametersTester(InvalidQueryParametersError.NON_INTEGER_MAX_RESULTS)
                .addFirstResult("0").addMaxResults("asd").setUri(ROOT_URI).testGetMethod();
        new InvalidQueryParametersTester(InvalidQueryParametersError.NON_INTEGER_FIRST_RESULT_AND_MAX_RESULTS)
                .addFirstResult("qwe").addMaxResults("asd").setUri(ROOT_URI).testGetMethod();

        new OkSearchResponseTester(new SearchResponse(0, new ArrayList<>()))
                .addFirstResult("0").addMaxResults("10").setUri(ROOT_URI).testGetMethod();

        List<TodoItem> todoItems = IntStream.rangeClosed(0, 14).boxed()
                .map(i -> new TodoItem(String.valueOf(i), i % 2 == 0))
                .collect(Collectors.toList());
        addTodoItems(todoItems);
        new OkSearchResponseTester(new SearchResponse(15, todoItems.subList(0, 10)))
                .addFirstResult("0").addMaxResults("10").setUri(ROOT_URI).testGetMethod();
        new OkSearchResponseTester(new SearchResponse(15, todoItems.subList(7, todoItems.size())))
                .addFirstResult("7").addMaxResults("10").setUri(ROOT_URI).testGetMethod();
    }

    @Test
    public void testRead() throws IOException, URISyntaxException {
        new BadPathTester(BadPathError.NON_INTEGER)
                .setUri(ROOT_URI + "asd").testGetMethod();
        new BadPathTester(BadPathError.TOO_MANY_PATHS)
                .setUri(ROOT_URI + "asd/1").testGetMethod();
        new BadPathTester(BadPathError.TOO_MANY_PATHS)
                .setUri(ROOT_URI + "1/asd").testGetMethod();

        new NotFoundTester(1)
                .setUri(ROOT_URI + 1).testGetMethod();

        TodoItem todoItem1 = new TodoItem("Text of incomplete item", false);
        long id1 = addTodoItem(todoItem1);
        new OkTodoItemTester(todoItem1)
                .setUri(ROOT_URI + id1).testGetMethod();

        TodoItem todoItem2 = new TodoItem("Text of completed item", true);
        long id2 = addTodoItem(todoItem2);
        new OkTodoItemTester(todoItem2)
                .setUri(ROOT_URI + id2).testGetMethod();
    }

    @Test
    public void testUpdate() throws IOException, URISyntaxException {
        new BadRequestTester(BadRequestError.TO_UPDATE)
                .setUri(ROOT_URI + 1).testPutMethod();
//        new IncompleteRequestBodyTester("asd")
//                .setUri(ROOT_URI + 1).testPutMethod();
//        new IncompleteRequestBodyTester("asd/1")
//                .setUri(ROOT_URI + 1).testPutMethod();
//        new IncompleteRequestBodyTester("1/asd")
//                .setUri(ROOT_URI + 1).testPutMethod();
//
//        new IncompleteRequestBodyTester("")
//                .setUri(ROOT_URI + 1).testPutMethod();
//        new IncompleteRequestBodyTester("{\"text\":\"Text content of todo-item\"}")
//                .setUri(ROOT_URI + 1).testPutMethod();
//        new IncompleteRequestBodyTester("{\"completed\":false}")
//                .setUri(ROOT_URI + 1).testPutMethod();

//        TodoItem todoItem = new TodoItem("asd", true);
//        String json = new ObjectMapper().writeValueAsString(todoItem);
//        String json = "{\"text\":\"asd\",\"completed\":true}";
//        System.out.println(json);
//        new BadPathTester(BadPathError.NON_INTEGER)
//                .setUri(ROOT_URI + "asd").setJsonBody(json).testPutMethod();
//        new BadPathTester(BadPathError.TOO_MANY_PATHS)
//                .setUri(ROOT_URI + "asd/1").setJsonBody(json).testPutMethod();
//        new BadPathTester(BadPathError.TOO_MANY_PATHS)
//                .setUri(ROOT_URI + "1/asd").setJsonBody(json).testPutMethod();
    }

}
