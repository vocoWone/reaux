import {applyMiddleware, createStore, Reducer, Store, StoreEnhancer, Middleware} from "redux";
import createSagaMiddleware from "redux-saga";
import {saga} from "./index";
import {ActionHandler, BaseStateView, ErrorHandler, BaseAppView} from "./type";

export function createApp(callback: (app: BaseAppView) => BaseAppView, reducer: Reducer<BaseStateView>, devtools: (enhancer: StoreEnhancer) => StoreEnhancer, ...middleware: Middleware[]) {
    const actionHandler: {[type: string]: ActionHandler} = {};
    const sagaMiddleware = createSagaMiddleware();
    const store: Store<BaseStateView> = createStore(reducer, devtools(applyMiddleware(...middleware, sagaMiddleware)));
    const errorHandler: ErrorHandler | null = null;
    sagaMiddleware.run(saga, actionHandler, errorHandler);
    const app = {store, sagaMiddleware, actionHandler, modules: {}, errorHandler};
    return callback(app);
}
