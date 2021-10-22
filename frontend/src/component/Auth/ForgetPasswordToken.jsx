import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
function ForgetPasswordToken() {
    const { token } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch({ type: 'SetUserToken', payload: {token: token} })
        history.replace('/auth/forget_password/change_password')
    },[])
    return (
        <div>
            <h1>Plase wait a minute</h1>
        </div>
    );
}

export default ForgetPasswordToken;