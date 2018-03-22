import ITodoItem, { isTodoItem } from "./ITodoItem";

interface ISearchResponse {
  count: number;
  todoItems: ITodoItem[];
}

function isSearchResponse(json: any): json is ISearchResponse {
  const cast: ISearchResponse = json as ISearchResponse;
  return typeof cast.count === "number"
    && cast.todoItems instanceof Array
    && cast.todoItems.every((item) => isTodoItem(item));
}

export function retrieve(uri: string): Promise<ISearchResponse> {
  return fetch(uri)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((json) => {
      if (isSearchResponse(json)) {
        return json;
      } else {
        throw new Error("Client info is not properly formatted");
      }
    })
    .catch((error) => {
      throw new Error("There has been a problem with your fetch operation: " + error.message);
    });
}
