import Button from "material-ui/Button";
import Card from "material-ui/Card";
import styled from "styled-components";

const offset: number = 12;

const StyledForm = styled.form`
  display: flex;
  margin: 0 0 ${offset * 2}px 0;
`;

const StyledTodoCard = styled(Card)`
  width: 98%;
  max-width: 500px;
  margin: ${offset}px auto;
`;

const StyledAddTodoButton = styled(Button)`
  flex: 0 1 100px;
  margin-left: ${offset}px !important;
`;

export { StyledForm, StyledTodoCard, StyledAddTodoButton };
