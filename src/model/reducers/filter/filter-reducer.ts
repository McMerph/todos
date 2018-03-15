import { Filters, isSetFilterAction } from "../../actions/filter/ISetFilterAction";
import IAction from "../../actions/IAction";

export const filterReducer = (filter: Filters = Filters.All, action: IAction): Filters => {
  if (isSetFilterAction(action)) {
    return action.filter;
  } else {
    return filter;
  }
};
