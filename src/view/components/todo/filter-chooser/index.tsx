import { FormControlLabel, FormLabel } from "material-ui/Form";
import Radio, { RadioGroup } from "material-ui/Radio";
import * as React from "react";
import { Filter } from "../../../../model/actions/filter/ISetFilterAction";
import IConnectedProps from "../IConnectedProps";
import { StyledFilterFormControl } from "./styled";

const FilterChooser: React.SFC<IConnectedProps> = (props) => (
  <StyledFilterFormControl component="fieldset" fullWidth={true}>
    <FormLabel component="legend">Filter</FormLabel>
    <RadioGroup
      aria-label="filter"
      name="filter"
      value={props.filter}
      onChange={(event: React.ChangeEvent<{}>, value: string) => props.actions.onSetFilter(value as Filter)}
    >
      <FormControlLabel value={Filter.All} control={<Radio/>} label="All"/>
      <FormControlLabel value={Filter.Completed} control={<Radio/>} label="Completed"/>
      <FormControlLabel value={Filter.Active} control={<Radio/>} label="Active"/>
    </RadioGroup>
  </StyledFilterFormControl>
);

export default FilterChooser;
