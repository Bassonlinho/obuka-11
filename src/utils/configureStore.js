import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/combinedReducer";
// thunk koristimo da bismo simulirali asinhrone pozive i da bismo te slucajeve
// hendlovali u nasim reducerima
let middleware = [thunk];

// ako je env. development, tj ako smo u lokalu, koristi redux-logger koji
// nam omogucava pracenje stanja u nasim reducerima tokom izvrsvanja
// akcija tj API poziva
if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
  });
  middleware.push(logger);
}

// combineWithDevTools i applyMiddleware nam sluzi da bismo primenili
// odredjene middleware koji nam olaksavaju development
// thunk koristimo za dispatch u akcijama
const store = composeWithDevTools(applyMiddleware(...middleware))(createStore)(
  rootReducer
);

export default store;
