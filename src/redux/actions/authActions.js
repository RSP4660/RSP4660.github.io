import { LogIn } from "../../services/service"
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SET_USER } from "./types";

export const logInUser = (email, password) => async dispatch => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const response = await LogIn(email, password);

        if(response.error) {
            dispatch({
                type: LOGIN_FAILED,
                payload: response.error
            })
        }
        else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.user
            })

            localStorage.setItem('token', response.token)
        }

    } catch (error) {
        dispatch({
            type: LOGIN_FAILED,
            payload: error.message
        })
    }
}

export const setUser = (user) => async dispatch => {
    dispatch({
        type: SET_USER,
        payload: user
    })
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}