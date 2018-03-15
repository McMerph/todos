import { actionCreator } from "../../../../src/model/actions/actionCreator";
import { Filter } from "../../../../src/model/actions/filter/ISetFilterAction";
import { filterReducer } from "../../../../src/model/reducers/filter/filter-reducer";

test("initial state", () => {
  expect(filterReducer(undefined, {type: "dummy"})).toBe(Filter.All);
});

test("'set filter' action", () => {
  expect(filterReducer(undefined, actionCreator.setFilter(Filter.All))).toBe(Filter.All);
  expect(filterReducer(undefined, actionCreator.setFilter(Filter.Completed))).toBe(Filter.Completed);
  expect(filterReducer(undefined, actionCreator.setFilter(Filter.Active))).toBe(Filter.Active);
});
