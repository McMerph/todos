import * as React from 'react';
import styled from 'styled-components';
import TextField, { TextFieldProps } from 'material-ui/TextField';
import Button, { ButtonProps } from 'material-ui/Button';
import Card, { CardProps } from 'material-ui/Card';
import ClassNameProps from '../classname-props';

const offset: number = 12;

const StyledForm = styled.form`
  display: flex;
  margin: 0 0 ${offset * 2}px 0;
`;

const TodoCard: React.SFC<ClassNameProps & CardProps> = props =>
  <Card className={props.className} {...props}/>;

const StyledTodoCard = styled(TodoCard)`
  width: 98%;
  max-width: 500px;
  margin: ${offset}px auto;
`;

const TodoTextField: React.SFC<ClassNameProps & TextFieldProps> = props =>
  <TextField className={props.className} {...props}/>;

const StyledTextField = styled(TodoTextField)`
  flex: auto;
`;

const AddTodoButton: React.SFC<ClassNameProps & ButtonProps> = props =>
  <Button className={props.className} {...props}/>;

const StyledAddTodoButton = styled(AddTodoButton)`
  flex: 0 1 100px;
  margin-left: ${offset}px !important;
`;

export { StyledForm, StyledTodoCard, StyledTextField, StyledAddTodoButton };