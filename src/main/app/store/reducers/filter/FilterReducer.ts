import AppAction from '../../actions/AppAction';
import { Filters, isSetFilterAction } from '../../actions/filter/SetFilterAction';

export const filterReducer = (filter: Filters = Filters.All, action: AppAction): Filters => {
  if (isSetFilterAction(action)) {
    return action.filter;
  } else {
    return filter;
  }
};
