import AppAction from '../AppAction';

export const SET_FILTER_ACTION_TYPE = 'SET_FILTER';

export enum Filters {

  All = 'All',
  Completed = 'Completed',
  Active = 'Active'

}

export interface SetFilterAction extends AppAction {

  filter: Filters;

}

export function isSetFilterAction(action: AppAction): action is SetFilterAction {
  const cast: SetFilterAction = action as SetFilterAction;
  return cast.type === SET_FILTER_ACTION_TYPE
    && Object.keys(Filters)
      .filter(key => isNaN(Number(Filters[key])))
      .includes(cast.filter);
}
