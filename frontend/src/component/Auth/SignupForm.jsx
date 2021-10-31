import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";

export default function SignupForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm();


  const submitHandler = data => {
    console.log(data);
  }
  const errorsHandler = (data, e) => {
    console.log(data, e);
  }

  return (
    <div>
      <h1 className="auth-title">Sign Up</h1>
      <form onSubmit={handleSubmit(submitHandler,errorsHandler)} className="auth-form">
        <div className="user-credential">
          <label className="form-label" for="email">
            Email
          </label>
          <input
            {...register("email")}
            className="form-control"
            type="email"
            name="email" />
          {errors.email?.type === "required" && <span className="text-danger">This field is required</span>}
        </div>
        <div className="user-credential">
          <label className="form-label" for="username">
            Username
          </label>
          <input
            {...register("username")}
            className="form-control"
            type="text"
            name="username" />
          {errors.username?.type === "required" && <span className="text-danger">This field is required</span>}
        </div>

        <PasswordInput label={"Password"} register={register("password",{ required: true })}/>
        <PasswordInput label={"Confirm Password"} register={register("confirm_password", { required: true })} />

        <div className="d-flex flex-column">
          <button type="submit" className="btn w-100 btn-primary-dark">
            Sign In
          </button>
          <button className="btn w-100 btn-primary-dark">
            Sign In With Google
          </button>
        </div>
      </form>
      <hr />
      <Link to="/auth/login">
        <button className="btn w-100 btn-primary-dark">
          Already Created Account
        </button>
      </Link>
    </div>
  );
}
