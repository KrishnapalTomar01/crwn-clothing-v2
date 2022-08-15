import { compose, createStore, applyMiddleware } from "redux"; 
import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";

const middlerwares = [logger];
const composedEnhancers = compose(applyMiddleware(...middlerwares));

export const store = createStore(rootReducer, undefined, composedEnhancers);