import ITodoItem from "../../../../model/ITodoItem";

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

function isTodoItem(object: any): object is ITodoItem {
  const cast: ITodoItem = object as ITodoItem;
  return typeof cast.id === "number"
    && typeof cast.text === "string"
    && typeof cast.completed === "boolean";
}

export function retrieve(uri: string): Promise<ISearchResponse> {
  return fetch(uri)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Network response was not ok");
        throw new Error();
      }
    })
    .then((json) => {
      if (isSearchResponse(json)) {
        return json;
      } else {
        console.error("Client info is not properly formatted");
        throw new Error();
      }
    })
    .catch((error) => {
      throw new Error("There has been a problem with your fetch operation: " + error.message);
    });
}
