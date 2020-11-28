import { createReducer } from "../../utils/createReducer";
import * as usersTypes from "./constants";
// aplikacija krece od ovog incijalnog stanja,
// koje se menja sa izvrsenjem odredjenih akcija na koje mi
// "reagujemo" u nasim reducerima i dobavljamo podatke sa API-ja
const initialState = {
  users: [],
  user: {},
  loading: false,
  error: "",
};
// reducer je funkcija koja se sastoji od state-a i action-a
// nisi ogranicen
const usersReducer = createReducer(initialState, {
  [usersTypes.GET_USERS_CALL](state) {
    return { ...state, loading: true };
  },
  [usersTypes.GET_USERS_SUCCESS](state, action) {
    return { ...state, loading: false, users: action.payload };
  },
  [usersTypes.GET_USERS_FAILED](state, action) {
    return { ...state, loading: false, error: action.message };
  },
});
export default usersReducer;
