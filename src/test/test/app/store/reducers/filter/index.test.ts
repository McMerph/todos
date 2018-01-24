import { actionProducer } from '../../../../../../main/app/store/actions/ActionsProducer';
import { Filters } from '../../../../../../main/app/store/actions/filter/SetFilterAction';
import { filterReducer } from '../../../../../../main/app/store/reducers/filter/FilterReducer';

test('initial state', () => {
  expect(filterReducer(undefined, {type: 'dummy'})).toBe(Filters.All);
});

test('\'set filter\' action', () => {
  expect(filterReducer(undefined, actionProducer.setFilter(Filters.All))).toBe(Filters.All);
  expect(filterReducer(undefined, actionProducer.setFilter(Filters.Completed))).toBe(Filters.Completed);
  expect(filterReducer(undefined, actionProducer.setFilter(Filters.Active))).toBe(Filters.Active);
});
