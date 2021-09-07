import React from "react";
import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <div>
      <h1 className="auth-title">Sign Up</h1>
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
        <div className="d-flex flex-column">
          <button type="submit" className="btn m-1 btn-primary-dark">
            Sign In
          </button>
          <button className="btn  m-1 btn-primary-dark">Sign In With Google</button>
        </div>
      </form>
      <hr />
      <Link to="/auth/login">
        <button className="btn m-1 w-100 btn-primary-dark">
           Already Created Account
        </button>
      </Link>
    </div>
  );
}
