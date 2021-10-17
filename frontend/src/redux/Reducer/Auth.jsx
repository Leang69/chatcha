const actions = {
    SetUserToken: (store, payload) => {
        return {
            ...store,
            token: payload.token,
        };
    },
    SetUserInfo: (store, payload) => {
        return {
            ...store,
            userInfo: payload.user_info,
        };
    },
}

export default function Auth(store = {
    token: null,
    userInfo: null
}, action) {
    switch (action.type) {
        case "SetUserToken":
            return actions.SetUserToken(store, action.payload);
        case "SetUserInfo":
            return actions.SetUserInfo(store, action.payload);
        default:
            return store;
    }
}