import { FormControlLabel } from "material-ui/Form";
import { css } from "styled-components";
import styled from "./styled-components";

const StyledFormControlLabel = styled(FormControlLabel)`
  ${(props) => props.theme.completed ? css` text-decoration: line-through; ` : ""};
`;

export { StyledFormControlLabel };
