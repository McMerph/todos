import * as React from 'react';
import { Filters } from '../store/actions/filter/SetFilterAction';

interface Props {

  filter: Filters;
  actions: {
    onSetFilter: (filter: Filters) => void;
  };

}

export default class FilterChooser extends React.PureComponent<Props, {}> {

  public render(): React.ReactNode {
    return (
      <div>
        <label>
          All
          <input name="filter"
                 type="radio"
                 value="All"
                 defaultChecked={this.props.filter === Filters.All}
                 onClick={() => this.props.actions.onSetFilter(Filters.All)}
          />
        </label>
        <label>
          Completed
          <input name="filter"
                 type="radio"
                 value="Completed"
                 defaultChecked={this.props.filter === Filters.Completed}
                 onClick={() => this.props.actions.onSetFilter(Filters.Completed)}
          />
        </label>
        <label>
          Active
          <input name="filter"
                 type="radio"
                 value="Active"
                 defaultChecked={this.props.filter === Filters.Active}
                 onClick={() => this.props.actions.onSetFilter(Filters.Active)}
          />
        </label>
      </div>
    );
  }

}
