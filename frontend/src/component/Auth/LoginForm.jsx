import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div>
      <h1 className="auth-title">Log In</h1>
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
          <button type="submit" className="btn m-1 w-100 btn-primary-dark">
            Log In
          </button>
          <button className="btn m-1 w-100 btn-primary-dark">
            Log In With Google
          </button>
        </div>
      </form>
      <hr />
      <Link to="/auth/signup">
        <button className="btn m-1 w-100 btn-primary-dark">
          Create Account
        </button>
      </Link>
    </div>
  );
}
