import { Filter, isSetFilterAction } from "../../actions/filter/ISetFilterAction";
import IAction from "../../actions/IAction";

export const filterReducer = (filter: Filter = Filter.All, action: IAction): Filter => {
  if (isSetFilterAction(action)) {
    return action.filter;
  } else {
    return filter;
  }
};
