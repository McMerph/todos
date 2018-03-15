import IAction from "../../IAction";
import ITodoItem from "../../ITodoItem";

export default abstract class TodoItemsHandler {

  private next: TodoItemsHandler | undefined;

  public constructor(next?: TodoItemsHandler) {
    this.next = next;
  }

  public handle(parameters: { state: ITodoItem[], action: IAction }): ITodoItem[] {
    if (this.isSuitableAction(parameters.action)) {
      return this.selfHandle(parameters);
    } else if (this.next) {
      return this.next.handle(parameters);
    } else {
      return parameters.state;
    }
  }

  protected abstract isSuitableAction(action: IAction): boolean;

  protected abstract selfHandle(parameters: { state: ITodoItem[], action: IAction }): ITodoItem[];

}
