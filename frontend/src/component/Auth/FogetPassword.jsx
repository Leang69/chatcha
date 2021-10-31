import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import PasswordInput from './PasswordInput';
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

    return (
        <div>
            <h1 className="auth-title">Change Password</h1>
            <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
                <PasswordInput label={"New Password"} register={register("password")} />
                <PasswordInput label={"New Confirm Password"} register={register("confirm_password", { required: true })} />
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