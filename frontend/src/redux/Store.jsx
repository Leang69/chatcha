import { applyMiddleware,createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";

const initStore = {
    token: null
}

const actions = {
    SetUserToken: (store, payload) => {
        return {
            ...store,
            userCredential: {
                token: payload.token,
            },
        };
    }
}

const reducer = (store = initStore, action) => {
    switch (action.type) {
        case "SetUserToken":
            return actions.SetUserToken(store, action.payload);
        default:
            return store;
    }
}

const storage = createStore(
    reducer,
    initStore,
    composeWithDevTools(applyMiddleware(logger))
)

export default storage;