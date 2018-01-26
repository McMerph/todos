import AppAction from '../../actions/app-action';
import { Filters, isSetFilterAction } from '../../actions/filter/set-filter-action';

export const filterReducer = (filter: Filters = Filters.All, action: AppAction): Filters => {
  if (isSetFilterAction(action)) {
    return action.filter;
  } else {
    return filter;
  }
};
