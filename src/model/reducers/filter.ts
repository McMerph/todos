import FilterType from "../FilterType";
import IAction from "../IAction";

interface ISetFilterAction extends IAction {
  filterType: FilterType;
}

export const SET_FILTER_ACTION_TYPE = "SET_FILTER";

function isSetFilterAction(action: IAction): action is ISetFilterAction {
  const cast: ISetFilterAction = action as ISetFilterAction;
  return cast.type === SET_FILTER_ACTION_TYPE && Object.keys(FilterType).includes(cast.filterType);
}

export const filter = (state: FilterType = FilterType.All, action: IAction): FilterType => {
  if (isSetFilterAction(action)) {
    return action.filterType;
  } else {
    return state;
  }
};