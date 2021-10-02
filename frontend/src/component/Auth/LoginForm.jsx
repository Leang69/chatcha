import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    axios
      .post(process.env.REACT_APP_BACKEND_URI + "api/login", data)
      .then((respoone) => {
        console.log(respoone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="auth-title">Log In</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
        <div className="user-credential">
          <label className="form-label" for="email">
            Email
          </label>
          <input
            {...register("email", { require: true })}
            className="form-control"
            type="email"
            name="email"
          />
        </div>
        <div className="user-credential">
          <label className="form-label" for="password">
            Password
          </label>
          <input
            {...register("password", { require: true })}
            className="form-control"
            type="password"
            name="password"
          />
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
