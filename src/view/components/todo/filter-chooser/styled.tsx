import { FormControl, FormControlProps } from "material-ui/Form";
import * as React from "react";
import styled from "styled-components";
import IClassNameProps from "../../IClassNameProps";

const FilterFormControl: React.SFC<IClassNameProps & FormControlProps> = (props) =>
  <FormControl className={props.className} {...props}/>;

const StyledFilterFormControl = styled(FilterFormControl)`
  margin: 24px 0 0 0 !important;
`;

export { StyledFilterFormControl };
