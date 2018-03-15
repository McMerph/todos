import IAction from "../IAction";

interface ISetFilterAction extends IAction {
  filterType: FilterType;
}

export const SET_FILTER_ACTION_TYPE = "SET_FILTER";

export enum FilterType {
  All = "All",
  Completed = "Completed",
  Active = "Active",
}

function isSetFilterAction(action: IAction): action is ISetFilterAction {
  const cast: ISetFilterAction = action as ISetFilterAction;
  return cast.type === SET_FILTER_ACTION_TYPE && Object.keys(FilterType).includes(cast.filterType);
}

export const filter = (filterType: FilterType = FilterType.All, action: IAction): FilterType => {
  if (isSetFilterAction(action)) {
    return action.filterType;
  } else {
    return filterType;
  }
};
