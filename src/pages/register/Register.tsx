import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser, login } from "../../features/user/userSlice";
import "./Register.scss";
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // onSubmitForm handle
  const onSubmitForm = (e: any) => {
    if (email === "" || password === "") {
      return;
    }
    e.preventDefault();
    let user: IUser = {
      email: email,
      password: password,
      books: [],
      language: "en",
    };
    dispatch(login(user));
    navigate("/home/en");
  };
  return (
    <Fragment>
      <section className="register">
        <h1>Register/Login page</h1>

        <Form data-testid="form" onSubmit={(e: any) => onSubmitForm(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              data-testid="email"
              placeholder="Enter email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Form.Text style={{ color: "red" }} className="">
              {email === "" ? "Email cannot be empty" : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              data-testid="password"
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Form.Text style={{ color: "red" }} className="">
              {password === "" ? "Password cannot be empty" : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            {/* <Form.Check type="checkbox" label="Check me out" /> */}
          </Form.Group>
          <Button variant="primary" data-testid="submitBtn" type="submit">
            Submit
          </Button>
        </Form>
      </section>
    </Fragment>
  );
};

export default Register;
