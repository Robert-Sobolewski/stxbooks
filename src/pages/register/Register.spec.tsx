import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Router } from "react-router-dom";
import { store } from "../../app/store";
import Register from "./Register";
import { createMemoryHistory } from "history";

describe("test Register page", () => {
  const history = createMemoryHistory();
  test("render page", () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Register />
        </Router>
      </Provider>
    );
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Register/Login page"
    );
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();

    expect(screen.getByTestId("password")).toBeInTheDocument();

    let submit = screen.getByText("Submit");

    expect(submit).toBeInTheDocument();
  });

  test("invalid form submit", () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Register />
        </Router>
      </Provider>
    );
    let submit = screen.getByText("Submit");

    fireEvent.click(submit);
    expect(screen.getByText(/Email cannot be empty/i)).toBeInTheDocument();
    expect(screen.getByText(/Password cannot be empty/i)).toBeInTheDocument();
    // screen.queryByRole("alert", {
    //   name: /Email and password must be provided/i,
    // });
    // expect(screen.getByRole("alert")).toHaveTextContent(
    //   "Email and password must be provided"
    // );
  });

  test("valid form submit", () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Register />
        </Router>
      </Provider>
      // { wrapper: MemoryRouter }
    );
    let email = screen.getByLabelText(/Email address/i);
    fireEvent.change(email, { target: { value: "ccc@email.com" } });
    let password = screen.getByLabelText(/Password/i);
    fireEvent.change(password, { target: { value: "ccc" } });
    let submit = screen.getByText("Submit");

    fireEvent.click(submit);
    // let tmp = screen.getByRole("heading");
    // console.log("tmp=", tmp);
    // expect(tmp).toHaveTextContent("home page");
    expect(
      screen.queryByText(/Email cannot be empty/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Password cannot be empty/i)
    ).not.toBeInTheDocument();
  });
});
