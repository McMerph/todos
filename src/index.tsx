import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./model/store";
import ConnectedTodo from "./view/components/todo/connected-todo";

import "normalize.css/normalize.css";
import "./view/fonts.css";
import "./view/index.css";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <ConnectedTodo/>
    </Provider>,
    document.getElementsByTagName("main")[0] as HTMLElement,
  );
});
