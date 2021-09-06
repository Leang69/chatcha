import React from "react";

export default function SignupForm() {
  return (
    <form className="auth-form">
      <div className="user-credential">
        <label className="form-label" for="email">
          Email
        </label>
        <input className="form-control" type="email" name="email" />
      </div>
      <div className="user-credential">
        <label className="form-label" for="username">
          Username
        </label>
        <input className="form-control" type="email" name="username" />
      </div>
      <div className="user-credential">
        <label className="form-label" for="password">
          Password
        </label>
        <input className="form-control" type="password" name="password" />
      </div>
      <div className="user-credential">
        <label className="form-label" for="conpassword">
          Confirm Password
        </label>
        <input className="form-control" type="password" name="conpassword" />
      </div>
      <a className="forgotPassword d-flex justify-content-end" href="#">
        Create Account
      </a>
      <div className="d-flex flex-column">
        <button type="submit" className="btn m-1 login-btns">
          Sign In
        </button>
        <button className="btn  m-1 login-btns">Sign In With Google</button>
      </div>
    </form>
  );
}
