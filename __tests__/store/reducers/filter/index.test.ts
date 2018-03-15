import { Filters } from "../../../../src/model/actions/filter/ISetFilterAction";
import { actionProducer } from "../../../../src/model/actions/IActionProducer";
import { filterReducer } from "../../../../src/model/reducers/filter/filter-reducer";

test("initial state", () => {
  expect(filterReducer(undefined, {type: "dummy"})).toBe(Filters.All);
});

test("'set filter' action", () => {
  expect(filterReducer(undefined, actionProducer.setFilter(Filters.All))).toBe(Filters.All);
  expect(filterReducer(undefined, actionProducer.setFilter(Filters.Completed))).toBe(Filters.Completed);
  expect(filterReducer(undefined, actionProducer.setFilter(Filters.Active))).toBe(Filters.Active);
});
