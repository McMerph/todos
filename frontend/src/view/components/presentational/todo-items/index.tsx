import { FormControl, FormGroup, FormLabel } from "material-ui/Form";
import * as React from "react";
import FilterType from "../../../../model/FilterType";
import ITodoItem from "../../../../model/ITodoItem";
import TodoItem from "../todo-item";

interface IProps {
  todoItems: ITodoItem[];
  filter: FilterType;
  onToggle: (index: number) => void;
}

const TodoItems: React.SFC<IProps> = (props) => {
  const { todoItems, filter } = props;
  const visibleTodoItems: ITodoItem[] = todoItems.filter((todo) => isVisible(filter, todo));

  return (
    <FormControl component="fieldset" fullWidth={true}>
      <FormLabel component="legend">Todo's list:</FormLabel>
      <FormGroup>
        {/*tslint:disable-next-line jsx-no-multiline-js*/}
        {visibleTodoItems.map((todo, index) =>
          <TodoItem
            key={index}
            todo={todo}
            // tslint:disable-next-line jsx-no-lambda
            onToggle={() => props.onToggle(index)}
          />,
        )}
      </FormGroup>
    </FormControl>
  );
};

const isVisible = (filter: FilterType, todo: ITodoItem): boolean => {
  return filter === FilterType.Completed ? todo.completed :
    filter === FilterType.Active ? !todo.completed : true;
};

export default TodoItems;
