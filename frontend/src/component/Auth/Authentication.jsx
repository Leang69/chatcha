import React, { useState } from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import FogetPasswordRequest from "./FogetPasswordRequest";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgetPasswordToken from "./ForgetPasswordToken"
import ForgetPassword from "./FogetPassword";

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
          <Route path="/auth/forget_password/change_password">
            <ForgetPassword />
          </Route>
          <Route path="/auth/forget_password">
            <FogetPasswordRequest />
          </Route>
          <Route path="/auth/signup">
            <SignupForm />
          </Route>
          <Route path="/auth/reset_password_token/:token">
            <ForgetPasswordToken />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
