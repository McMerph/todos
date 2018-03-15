import Checkbox from "material-ui/Checkbox";
import { FormControl, FormControlLabel, FormGroup, FormLabel } from "material-ui/Form";
import * as React from "react";
import FilterType from "../../../../model/FilterType";
import ITodoItem from "../../../../model/ITodoItem";

interface IProps {
  todoItems: ITodoItem[];
  filterType: FilterType;
  onToggle: (id: number) => void;
}

const TodosList: React.SFC<IProps> = (props) => (
  <FormControl component="fieldset" fullWidth={true}>
    <FormLabel component="legend">Todo's list:</FormLabel>
    <FormGroup>
      {props.todoItems.filter((todo) => isVisible(props.filterType, todo)).map((todo) => (
        <FormControlLabel
          key={todo.id}
          control={<Checkbox checked={todo.completed} onChange={() => props.onToggle(todo.id)}/>}
          label={todo.text}
        />),
      )}
    </FormGroup>
  </FormControl>
);

const isVisible = (filterType: FilterType, todo: ITodoItem): boolean => {
  return filterType === FilterType.Completed ? todo.completed :
    filterType === FilterType.Active ? !todo.completed : true;
};

export default TodosList;
