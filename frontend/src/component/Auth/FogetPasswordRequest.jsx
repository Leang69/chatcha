import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
function FogetPasswordRequest() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const timeWaiting = 90

    const [WrongEmail, SetWrongEmail] = useState("non")
    const [Loading, SetLoading] = useState(false)
    const [WaitingNextRequest, SetWaitingNextRequest] = useState(false)
    const [WaitingTime, SetWaitingTime] = useState(timeWaiting)


    const submitHandler = (data) => {
        SetLoading(true)
        axios.post(process.env.REACT_APP_BACKEND_URI + "api/forget_password_request", data)
            .then((r) => {
                if (r.data.status === 'success') {
                    SetWrongEmail("no")
                    SetWaitingNextRequest(true)
                } else {
                    SetWrongEmail("yes")
                }
                SetLoading(false)
            }).catch((e) => {
                console.log("error");
                SetWrongEmail("yes")
                SetLoading(false)
            })
    }

    if (WaitingNextRequest) {
        setTimeout(() => {
            if (WaitingTime > 0) {
                SetWaitingTime(WaitingTime - 1)
            } else {
                SetWaitingTime(timeWaiting+1)
                SetWaitingNextRequest(false)
            }
        }, 1000)
    }

    useEffect(() => {
        console.log(WaitingTime);
    }, [WaitingTime])

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
                    {WrongEmail === "yes" && <span className="text-danger">This Email Isn't Sign Up</span>}
                </div>
                {
                    Loading
                        ? <div className=" d-flex justify-content-center">
                            <div class="spinner-border text-primary my-2" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        : WaitingNextRequest
                            ? <p>You can send a request in next {WaitingTime} second</p>
                            : <button type="submit" className="btn w-100 btn-primary-dark">
                                Request Reset Password Code
                            </button>
                }
            </form>
        </div>
    );
}

export default FogetPasswordRequest
