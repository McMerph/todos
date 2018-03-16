import { FormControlLabel, FormLabel } from "material-ui/Form";
import Radio, { RadioGroup } from "material-ui/Radio";
import * as React from "react";
import FilterType from "../../../../model/FilterType";
import { StyledFormControl } from "./styled";

interface IProps {
  filter: FilterType;
  onSetFilter: (filter: FilterType) => void;
}

const FilterChooser: React.SFC<IProps> = (props) => {
  const onChange = (event: React.ChangeEvent<{}>, filter: string): void => {
    props.onSetFilter(filter as FilterType);
  };

  return (
    <StyledFormControl component="fieldset" fullWidth={true}>
      <FormLabel component="legend">Filter</FormLabel>
      <RadioGroup aria-label="filter" name="filter" value={props.filter} onChange={onChange}>
        <FormControlLabel value={FilterType.All} control={<Radio/>} label="All"/>
        <FormControlLabel value={FilterType.Completed} control={<Radio/>} label="Completed"/>
        <FormControlLabel value={FilterType.Active} control={<Radio/>} label="Active"/>
      </RadioGroup>
    </StyledFormControl>
  );
};

export default FilterChooser;
