import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";
import Reducer from "./Reducer/Reducer";


const storage = createStore(
    Reducer,
    composeWithDevTools(applyMiddleware(logger))
)

export default storage;