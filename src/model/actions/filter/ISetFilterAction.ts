import IAction from "../IAction";

export const SET_FILTER_ACTION_TYPE = "SET_FILTER";

export enum Filter {
  All = "All",
  Completed = "Completed",
  Active = "Active",
}

export interface ISetFilterAction extends IAction {
  filter: Filter;
}

export function isSetFilterAction(action: IAction): action is ISetFilterAction {
  const cast: ISetFilterAction = action as ISetFilterAction;
  return cast.type === SET_FILTER_ACTION_TYPE
    && Object.keys(Filter)
    // TODO Delete?
    // .filter(key => isNaN(Number(Filter[key])))
      .includes(cast.filter);
}
