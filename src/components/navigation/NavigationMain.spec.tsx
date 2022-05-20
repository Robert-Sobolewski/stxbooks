import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Router } from "react-router-dom";
import { store } from "../../app/store";
import { createMemoryHistory } from "history";
import NavigationMain from "./NavigationMain";

describe("test navigation component", () => {
  const history = createMemoryHistory();
  test("render page", () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <NavigationMain />
        </Router>
      </Provider>
    );
    expect(screen.getByText("STX BookStore")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
}); // end describe
