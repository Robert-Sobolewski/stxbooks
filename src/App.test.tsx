import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

test("renders learn react link", () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );

  // expect(getByText(/learn/i)).toBeInTheDocument();
  let head = screen.getByRole("heading", { level: 1 });
  expect(head).toBeInTheDocument();
  expect(screen.getByText(/Login page/i)).toBeInTheDocument();
});
