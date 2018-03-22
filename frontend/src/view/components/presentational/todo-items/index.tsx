import Checkbox from "material-ui/Checkbox";
import { FormControl, FormControlLabel, FormGroup, FormLabel } from "material-ui/Form";
import * as React from "react";
import FilterType from "../../../../model/FilterType";
import ITodoItem from "../../../../model/ITodoItem";

interface IProps {
  todoItems: ITodoItem[];
  filter: FilterType;
  onToggle: (index: number) => void;
}

const TodoItems: React.SFC<IProps> = (props) => (
  <FormControl component="fieldset" fullWidth={true}>
    <FormLabel component="legend">Todo's list:</FormLabel>
    <FormGroup>
      {/*tslint:disable-next-line jsx-no-multiline-js*/}
      {props.todoItems.filter((todo) => isVisible(props.filter, todo)).map((todo, index) => (
        <FormControlLabel
          key={index}
          // tslint:disable-next-line jsx-no-lambda
          control={<Checkbox checked={todo.completed} onChange={() => props.onToggle(index)}/>}
          label={todo.text}
        />),
      )}
    </FormGroup>
  </FormControl>
);

const isVisible = (filter: FilterType, todo: ITodoItem): boolean => {
  return filter === FilterType.Completed ? todo.completed :
    filter === FilterType.Active ? !todo.completed : true;
};

export default TodoItems;
