import { FormControlLabel, FormLabel } from "material-ui/Form";
import Radio, { RadioGroup } from "material-ui/Radio";
import * as React from "react";
import FilterType from "../../../../model/FilterType";
import IConnectedProps from "../IConnectedProps";
import { StyledFilterFormControl } from "./styled";

const FilterChooser: React.SFC<IConnectedProps> = (props) => (
  <StyledFilterFormControl component="fieldset" fullWidth={true}>
    <FormLabel component="legend">Filter</FormLabel>
    <RadioGroup
      aria-label="filter"
      name="filter"
      value={props.filterType}
      onChange={(event: React.ChangeEvent<{}>, value: string) => props.actions.onSetFilter(value as FilterType)}
    >
      <FormControlLabel value={FilterType.All} control={<Radio/>} label="All"/>
      <FormControlLabel value={FilterType.Completed} control={<Radio/>} label="Completed"/>
      <FormControlLabel value={FilterType.Active} control={<Radio/>} label="Active"/>
    </RadioGroup>
  </StyledFilterFormControl>
);

export default FilterChooser;
