import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";

export default function SignupForm() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const [httpErrosRespone, setHttpErrosRespone] = useState("")
  const watchPassword = watch('password')
  const [loading, setLoading] = useState(false);

  const submitHandler = data => {
    setLoading(true)
    setHttpErrosRespone("")
    axios.post(process.env.REACT_APP_BACKEND_URI + "api/signup", data).
      then(r => {
        console.log(r.data);
        setLoading(false)
      }).catch(e => {
        setHttpErrosRespone(e.response.data.status)
        setLoading(false)
      })
  }




  return (
    <div>
      <h1 className="auth-title">Sign Up</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="auth-form">

        <div className="user-credential">
          <label className="form-label" for="email">
            Email
          </label>
          <input
            {...register("email", { required: true })}
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
            {...register("username", { required: true })}
            className="form-control"
            type="text"
            name="username" />
          {errors.username?.type === "required" && <span className="text-danger">This field is required</span>}
        </div>

        <PasswordInput label={"Password"} register={register("password", { required: true })} />

        <PasswordInput label={"Confirm Password"} errorHandler={errors.confirm_password && <span className="text-danger">{errors.confirm_password.message}</span>} register={register("confirm_password", {
          required: true,
          validate: value => value === watchPassword || "Confirm password not match"
        })} />

        {<p className="text-danger">{httpErrosRespone}</p>}

        {loading
          ? <div className=" d-flex justify-content-center">
            <div class="spinner-border text-primary my-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          : <div>
            <div className="d-flex flex-column">
              <button type="submit" className="btn w-100 btn-primary-dark">
                Sign In
              </button>
              <button className="btn w-100 btn-primary-dark">
                Sign In With Google
              </button>
            </div>
            <hr />
            <Link to="/auth/login">
              <button className="btn w-100 btn-primary-dark">
                Already Created Account
              </button>
            </Link>
          </div>}

      </form>
    </div>
  );
}
