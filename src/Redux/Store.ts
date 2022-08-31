import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./Reducers/Root";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./Sagas/RootSaga";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
