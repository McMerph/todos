import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import FilterType from "../FilterType";

interface ISetFilterAction extends IAction {
  filter: FilterType;
}

function isSetFilterAction(action: IAction): action is ISetFilterAction {
  const cast: ISetFilterAction = action as ISetFilterAction;
  return cast.type === ActionType.SetFilter && Object.keys(FilterType).includes(cast.filter);
}

export const filter = (state: FilterType = FilterType.All, action: IAction): FilterType => {
  if (isSetFilterAction(action)) {
    return action.filter;
  } else {
    return state;
  }
};
