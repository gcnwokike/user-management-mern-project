import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    //console.log(res);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = (
  fname,
  lname,
  oname,
  email,
  password
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ oname, fname, lname, email, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/users",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const networkCheck = async () => {
      //let errors = err.message;
      if (err.message === "Network Error") {
        //let errors = err.response.data.errors;

        //errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        dispatch({
          type: REGISTER_FAIL
        });
        return await dispatch(
          setAlert(
            `${err.message} Api Server Not Responding Check Your Internet Connection and Try Again`,
            "danger"
          )
        );
      }

      let errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL
      });
    };

    networkCheck();
  }
};

//Login User

export const login = (oname, email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ oname, email, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth",
      body,
      config
    );
    //console.log(res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    //console.log(err.message);

    // if (err.)
    //let errors = err.response.data.errors;
    const networkCheck = async () => {
      //let errors = err.message;
      if (err.message === "Network Error") {
        //let errors = err.response.data.errors;

        //errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        dispatch({
          type: LOGIN_FAIL
        });
        return await dispatch(
          setAlert(
            `${err.message} Api Server Not Responding Check Your Internet Connection and Try Again`,
            "danger"
          )
        );
      }

      let errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL
      });
    };

    networkCheck();
  }
};

//logout and clear profile

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
