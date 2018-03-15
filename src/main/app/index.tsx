import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import ConnectedTodo from "./components/todo/connected-todo";
import { store } from "./store/store";

import "normalize.css/normalize.css";
import "./fonts.css";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <ConnectedTodo/>
    </Provider>,
    document.getElementsByTagName("main")[0] as HTMLElement,
  );
});
