import TodoItem from '../../TodoItem';
import AppAction from '../../actions/AppAction';

export default abstract class TodoItemsHandler {

  private next: TodoItemsHandler | undefined;

  protected abstract isSuitableAction(action: AppAction): boolean;

  protected abstract selfHandle(parameters: { todoItems: TodoItem[], action: AppAction }): TodoItem[];

  public constructor(next?: TodoItemsHandler) {
    this.next = next;
  }

  public handle(parameters: { todoItems: TodoItem[], action: AppAction }): TodoItem[] {
    if (this.isSuitableAction(parameters.action)) {
      return this.selfHandle(parameters);
    } else if (this.next) {
      return this.next.handle(parameters);
    } else {
      return parameters.todoItems;
    }
  }

}
