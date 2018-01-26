import * as React from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel, FormLabel } from 'material-ui/Form';
import { Filters } from '../../../store/actions/filter/set-filter-action';
import { StyledFilterFormControl } from './styled';

interface Props {
  filter: Filters;
  actions: { onSetFilter: (filter: Filters) => void; };
}

const FilterChooser: React.SFC<Props> = props => (
  <StyledFilterFormControl component="fieldset" fullWidth>
    <FormLabel component="legend">Filter</FormLabel>
    <RadioGroup
      aria-label="filter"
      name="filter"
      value={props.filter}
      onChange={(event: React.ChangeEvent<{}>, value: string) => props.actions.onSetFilter(value as Filters)}
    >
      <FormControlLabel value={Filters.All} control={<Radio/>} label="All"/>
      <FormControlLabel value={Filters.Completed} control={<Radio/>} label="Completed"/>
      <FormControlLabel value={Filters.Active} control={<Radio/>} label="Active"/>
    </RadioGroup>
  </StyledFilterFormControl>
);

export default FilterChooser;
