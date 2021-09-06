import React, { useState } from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
export default function Authentication() {
  const [isLogin, setLogin] = useState();
  let history = useHistory();
  return (
    <div className="App">
      <div className="title d-flex justify-content-center align-items-center">
        <h1 className="my-auto">chatcha</h1>
      </div>

      <div className="login-panel container">
        <div className="auth-switchs">
          <button
            onClick={() => {
              setLogin(true);
              history.push("/auth/login");
            }}
            className={`btn  ${isLogin ? "active" : "deactive"}`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setLogin(false);
              history.push("/auth/signup");
            }}
            className={`btn  ${!isLogin ? "active" : "deactive"}`}
          >
            Sign Up
          </button>
        </div>

        <Switch>
          <Route path="/auth/login">
            <LoginForm />
          </Route>
          <Route path="/auth/signup">
            <SignupForm />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
