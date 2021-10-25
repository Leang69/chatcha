import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
function ForgetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const token = useSelector((state) => state.Auth.token)
    const [loading, setLoading] = useState(false);

    const submitHandler = (data) => {
        setLoading(true)
        axios.post(process.env.REACT_APP_BACKEND_URI + "api/forget_password",
            data, {
            headers:
                { 'Authorization': 'Bearer ' + token }
        }).then((r) => {
            console.log(r.data);
            setLoading(false)
        }).catch((e) => {
            console.log(e);
            setLoading(false)
        })

    }

    const confirmPasswordInputRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const PasswordInputRef = useRef(null);
    const PasswordRef = useRef(null);

    const [ShowPassword, SetShowPassword] = useState(false);
    const [ShowConPassword, SetConShowPassword] = useState(false);

    const showPasswordHandle = (ref,state,setState) => {
        if (ref.current.type === "password") {
            ref.current.type = "text"
        } else {
            ref.current.type = "password"
        }
        setState(!state);
    }
    const PasswordInputForcusHandle = ref => {
        ref.current.focus()
    }

    return (
        <div>
            <h1 className="auth-title">Change Password</h1>
            <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
                <div className="user-credential">
                    <label className="form-label" for="password">
                        New Password
                    </label>
                    <div ref={PasswordRef} className="d-flex password">
                        <input
                            {...register("password", { required: true })}
                            className="form-control"
                            type="password"
                            name="password"
                            onFocus={() => console.log("hello")}
                            ref={PasswordInputRef}
                            onFocus={() => { PasswordInputForcusHandle(PasswordRef) }}
                        />
                        <button onClick={() => { showPasswordHandle(PasswordInputRef, ShowPassword,SetShowPassword) }} type="button" className="btn showPassword">
                        <i className={`bi bi-eye${ShowPassword ? "" : "-slash"}`} />
                        </button>
                    </div>
                </div>
                <div className="user-credential">
                    <label className="form-label" for="confirm_password">
                        New Confirm Password
                    </label>
                    <div ref={confirmPasswordRef} className="d-flex password">
                        <input
                            {...register("confirm_password", { required: true })}
                            className="form-control"
                            type="password"
                            name="confirm_password"
                            onFocus={() => console.log("hello")}
                            ref={confirmPasswordInputRef}
                            onFocus={() => { PasswordInputForcusHandle(confirmPasswordRef) }}
                        />
                        <button onClick={() => { showPasswordHandle(confirmPasswordInputRef,ShowConPassword,SetConShowPassword) }} type="button" className="btn showPassword">
                            <i className={`bi bi-eye${ShowConPassword ? "" : "-slash"}`} />
                        </button>
                    </div>

                </div>
                {
                    loading ?
                        <div className=" d-flex justify-content-center">
                            <div class="spinner-border text-primary my-2" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        : <button type="submit" className="btn w-100 btn-primary-dark">
                            Change Password
                        </button>
                }
            </form>
        </div>
    );
}

export default ForgetPassword;