import React from "react";

export default function LoginForm() {
  return (
    <form className="auth-form">
      <div className="user-credential">
        <label className="form-label" for="email">
          Email
        </label>
        <input className="form-control" type="email" name="email" />
      </div>
      <div className="user-credential">
        <label className="form-label" for="password">
          Password
        </label>
        <input className="form-control" type="password" name="password" />
      </div>
      <a className="forgotPassword d-flex justify-content-end" href="#">
        Forget Password
      </a>
      <div className="d-flex flex-column">
        <button type="submit" className="btn m-1 login-btns">
          Log In
        </button>
        <button className="btn  m-1 login-btns">Log In With Google</button>
      </div>
    </form>
  );
}
