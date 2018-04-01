import Checkbox from "material-ui/Checkbox";
import * as React from "react";
import ITodoItem from "../../../../model/ITodoItem";
import { StyledFormControlLabel } from "./styled";

interface IProps {
  todo: ITodoItem;
  onToggle(): void;
}

const TodoItem: React.SFC<IProps> = (props) => {
  const { onToggle } = props;
  const { completed, text } = props.todo;

  return (
    <StyledFormControlLabel
      theme={{ completed }}
      control={<Checkbox checked={completed} onChange={onToggle}/>}
      label={text}
    />);
};

export default TodoItem;
