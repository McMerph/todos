import actionCreator from "../actionCreator";
import FilterType from "../FilterType";
import { filter } from "./filter";

test("'set filter' action", () => {
  expect(filter(undefined, actionCreator.setFilter(FilterType.All)))
    .toBe(FilterType.All);
  expect(filter(undefined, actionCreator.setFilter(FilterType.Completed)))
    .toBe(FilterType.Completed);
  expect(filter(undefined, actionCreator.setFilter(FilterType.Active)))
    .toBe(FilterType.Active);
});
