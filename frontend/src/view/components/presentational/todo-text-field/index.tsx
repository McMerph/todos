import * as React from "react";
import { FormEvent } from "react";
import { StyledTextField } from "./styled";

interface IProps {
  value: string;
  onChange(event: FormEvent<HTMLInputElement>): void;
}

const TodoTextField: React.SFC<IProps> = (props) =>
  <StyledTextField label="Todo" value={props.value} onChange={props.onChange}/>;

export default TodoTextField;
