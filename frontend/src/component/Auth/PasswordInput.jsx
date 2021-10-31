import React, { useEffect, useRef, useState } from 'react';
function PasswordInput({ register, label, errorHandler }) {

    const [ShowPassword, SetShowPassword] = useState(false);
    const inputRef = useRef(null)

    const showPasswordHandle = (ref, state, setState) => {
        if (ref.type === "password") {
            ref.type = "text"
        } else {
            ref.type = "password"
        }
        setState(!state);
    }


    return (
        <div className="user-credential">
            <label className="form-label">
                {label}
            </label>
            <div ref={inputRef} className="d-flex password">
                <input
                    {...register}
                    className="form-control"
                    type="password"
                />
                <button onClick={() => { showPasswordHandle(inputRef.current.childNodes[0], ShowPassword, SetShowPassword) }} type="button" className="btn showPassword">
                    <i className={`bi bi-eye${ShowPassword ? "" : "-slash"}`} />
                </button>
            </div>
            {errorHandler}
        </div>
    );
}

export default PasswordInput;