import { FormControlLabel, FormLabel } from "material-ui/Form";
import Radio, { RadioGroup } from "material-ui/Radio";
import * as React from "react";
import FilterType from "../../../../model/FilterType";
import { StyledFormControl } from "./styled";

interface IProps {
  filterType: FilterType;
  onSetFilter: (filterType: FilterType) => void;
}

const FilterChooser: React.SFC<IProps> = (props) => (
  <StyledFormControl component="fieldset" fullWidth={true}>
    <FormLabel component="legend">Filter</FormLabel>
    <RadioGroup
      aria-label="filter"
      name="filter"
      value={props.filterType}
      onChange={(event: React.ChangeEvent<{}>, filterType: string) =>
        props.onSetFilter(filterType as FilterType)}
    >
      <FormControlLabel value={FilterType.All} control={<Radio/>} label="All"/>
      <FormControlLabel value={FilterType.Completed} control={<Radio/>} label="Completed"/>
      <FormControlLabel value={FilterType.Active} control={<Radio/>} label="Active"/>
    </RadioGroup>
  </StyledFormControl>
);

export default FilterChooser;
