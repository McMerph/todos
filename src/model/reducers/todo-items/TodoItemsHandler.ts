import IAction from "../../IAction";
import ITodoItem from "../../ITodoItem";

export default abstract class TodoItemsHandler {

  private next: TodoItemsHandler | undefined;

  public constructor(next?: TodoItemsHandler) {
    this.next = next;
  }

  public handle(state: ITodoItem[], action: IAction): ITodoItem[] {
    if (this.isSuitableAction(action)) {
      return this.selfHandle(state, action);
    } else if (this.next) {
      return this.next.handle(state, action);
    } else {
      return state;
    }
  }

  protected abstract isSuitableAction(action: IAction): boolean;

  protected abstract selfHandle(state: ITodoItem[], action: IAction): ITodoItem[];

}
