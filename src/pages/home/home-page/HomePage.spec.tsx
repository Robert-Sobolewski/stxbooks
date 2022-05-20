import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store } from "../../../app/store";

import { createMemoryHistory } from "history";
import HomePage from "./HomePage";

describe("test Home page", () => {
  const history = createMemoryHistory();

  test("render page", () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <HomePage />
        </Router>
      </Provider>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Home page");
  });
}); // end describe
