import { CardContent } from "material-ui/Card";
import Divider from "material-ui/Divider";
import * as React from "react";
import { FormEvent } from "react";
import FilterChooser from "./filter-chooser/index";
import IConnectedProps from "./IConnectedProps";
import { StyledAddTodoButton, StyledForm, StyledTextField, StyledTodoCard } from "./styled";
import TodoList from "./todo-list";

// TODO Fix TodoTextField behavior after submit. Controlled component?
export default class Todo extends React.PureComponent<IConnectedProps, {}> {

  private input: HTMLInputElement;

  public constructor(props: IConnectedProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <StyledTodoCard>
        <CardContent>
          <StyledForm onSubmit={this.onSubmit}>
            <StyledTextField label="Todo" inputRef={(input: HTMLInputElement) => this.input = input}/>
            <StyledAddTodoButton variant="raised" color="primary" type="submit">Add</StyledAddTodoButton>
          </StyledForm>
          <TodoList {...this.props}/>
          <Divider/>
          <FilterChooser {...this.props}/>
        </CardContent>
      </StyledTodoCard>
    );
  }

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.input.value.length > 0) {
      const value: string = this.input.value;
      this.input.value = "";
      this.props.actions.onAdd(value);
    }
  }

}
