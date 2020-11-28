import * as usersTypes from "./constants";
import axios from "../../utils/AxiosWrapper";
export const getUsers = () => {
  return (dispatch) => {
    dispatch({
      type: usersTypes.GET_USERS_CALL,
    });

    return axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return dispatch({
          type: usersTypes.GET_USERS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: usersTypes.GET_USERS_FAILED,
          message: error.message,
        });
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_USER",
      id: id,
    });
  };
};
