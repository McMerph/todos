import Checkbox from "material-ui/Checkbox";
import { FormControl, FormControlLabel, FormGroup, FormLabel } from "material-ui/Form";
import * as React from "react";
import { Filter } from "../../../model/actions/filter/ISetFilterAction";
import ITodoItem from "../../../model/ITodoItem";
import IConnectedProps from "./IConnectedProps";

const TodoList: React.SFC<IConnectedProps> = (props) => (
  <FormControl component="fieldset" fullWidth={true}>
    <FormLabel component="legend">Todo's list:</FormLabel>
    <FormGroup>
      {props.todoItems.filter((todo) => isVisible(props, todo)).map((todo) =>
        <FormControlLabel
          key={todo.id}
          control={<Checkbox checked={todo.completed} onChange={() => props.actions.onToggle(todo.id)}/>}
          label={todo.text}
        />,
      )}
    </FormGroup>
  </FormControl>
);

const isVisible: (props: IConnectedProps, todo: ITodoItem) => boolean = (props, todo) => {
  return props.filter === Filter.Completed ? todo.completed :
    props.filter === Filter.Active ? !todo.completed : true;
};

export default TodoList;
