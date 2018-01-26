import * as React from 'react';
import { Filters } from '../store/actions/filter/SetFilterAction';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';

interface Props {

  filter: Filters;
  actions: {
    onSetFilter: (filter: Filters) => void;
  };

}

export default class FilterChooser extends React.PureComponent<Props, {}> {

  public constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Filter</FormLabel>
        <RadioGroup
          aria-label="filter"
          name="filter"
          value={this.props.filter}
          onChange={this.handleChange}
        >
          <FormControlLabel value={Filters.All} control={<Radio/>} label="All"/>
          <FormControlLabel value={Filters.Completed} control={<Radio/>} label="Completed"/>
          <FormControlLabel value={Filters.Active} control={<Radio/>} label="Active"/>
        </RadioGroup>
      </FormControl>
    );
  }

  private handleChange(event: React.ChangeEvent<{}>, value: string): void {
    this.props.actions.onSetFilter(value as Filters);
  }

}
