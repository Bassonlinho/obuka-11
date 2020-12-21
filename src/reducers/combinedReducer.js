import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
//combineReducers povezuje N reducera u jedan i onda se prosledjuje kao parametar
// createStore funkciji koja od toga pravi store(globalno stanje) koje je potrebno
// Provideru da bi se koristilo kroz celu aplikaciju
export default combineReducers({
  users: usersReducer,
  //tvoj dat naziv reducera: importovan reducer
});
