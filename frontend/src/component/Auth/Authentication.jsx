import React, { useState } from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import FogetPassword from "./FogetPassword";
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

      <div className="auth-panel container">
        <Switch>
          <Route path="/auth/login">
            <LoginForm />
          </Route>
          <Route path="/auth/forget_password">
            <FogetPassword />
          </Route>
          <Route path="/auth/signup">
            <SignupForm />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
