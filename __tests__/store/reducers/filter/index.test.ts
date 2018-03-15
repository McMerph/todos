import actionCreator from "../../../../src/model/actionCreator";
import FilterType from "../../../../src/model/FilterType";
import { filter } from "../../../../src/model/reducers/filter";

test("'set filter' action", () => {
  expect(filter(undefined, actionCreator.setFilter(FilterType.All))).toBe(FilterType.All);
  expect(filter(undefined, actionCreator.setFilter(FilterType.Completed))).toBe(FilterType.Completed);
  expect(filter(undefined, actionCreator.setFilter(FilterType.Active))).toBe(FilterType.Active);
});
