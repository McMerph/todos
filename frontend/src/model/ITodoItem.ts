export default interface ITodoItem {
  id?: number;
  text: string;
  completed: boolean;
}

export function isTodoItem(object: any): object is ITodoItem {
  const cast: ITodoItem = object as ITodoItem;
  return (!cast.id || typeof cast.id === "number") &&
    typeof cast.text === "string" &&
    typeof cast.completed === "boolean";
}
