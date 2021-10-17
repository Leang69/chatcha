import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
function FogetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = (data) => {
        axios.post(process.env.REACT_APP_BACKEND_URI)
    }

    return (
        <div>
            <h1 className="auth-title">Forget Password</h1>
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
                    />
                    {errors.email?.type === "required" && <span className="text-danger">This field is required</span>}
                </div>
                <button type="submit" className="btn w-100 btn-primary-dark">
                    Request Reset Password Code
                </button>
            </form>
        </div>
    );
}

export default FogetPassword
