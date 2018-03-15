import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./model/store";
import ConnectedApp from "./view/components/containers/ConnectedApp";

import "normalize.css/normalize.css";

import "./view/inject-global";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}><ConnectedApp/></Provider>,
    document.getElementsByTagName("main")[0] as HTMLElement,
  );
});
