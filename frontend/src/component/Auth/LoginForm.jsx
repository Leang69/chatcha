import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isInvalidCreditail, setIsInvalidCreditail] = useState(false)
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const submitHandler = (data) => {
    console.log(data);
    setIsInvalidCreditail(false)
    setLoading(true)
    axios
      .post(process.env.REACT_APP_BACKEND_URI + "api/login", data)
      .then((respoone) => {
        console.log(respoone.data);
        dispatch({ type: 'SetUserToken', payload: respoone.data })
        dispatch({ type: 'SetUserInfo', payload: respoone.data })
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setIsInvalidCreditail(true)
        setLoading(false)
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
            {...register("email", { required: true })}
            className="form-control"
            type="email"
            name="email"
            onChange={() => setIsInvalidCreditail(false)}
          />
          {errors.email?.type === "required" && <span className="text-danger">This field is required</span>}
        </div>
        <div className="user-credential">
          <label className="form-label" for="password">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className="form-control"
            type="password"
            name="password"
            onChange={() => setIsInvalidCreditail(false)}
          />
          {errors.password?.type === "required" && <span className="text-danger">This field is required</span>}
        </div>
        <Link to="/auth/forget_password">
          <a className="forgotPassword d-flex justify-content-end">
            Forget Password
          </a>
        </Link>
        {isInvalidCreditail && <p className="text-danger">Wrong Password or Email</p>}

        {loading
          ? <div className=" d-flex justify-content-center">
            <div class="spinner-border text-primary my-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div> : <div><div className="d-flex flex-column">
            <button type="submit" className="btn w-100 btn-primary-dark">
              Log In
            </button>
            <button className="btn w-100 btn-primary-dark">
              Log In With Google
            </button>
          </div>
            <hr />
            <Link to="/auth/signup">
              <button className="btn w-100 btn-primary-dark">
                Create Account
              </button>
            </Link></div>}

      </form>

    </div>
  );
}
