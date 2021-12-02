import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SET_USER } from "../actions/types"

const initialState = {}

export const logInReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                processing: true,
            }
        
        case LOGIN_SUCCESS:
            return {
                processing: false,
                user: action.payload
            }
        
        case LOGIN_FAILED:
            return {
                processing: false,
                error: action.payload
            }

        case SET_USER:
            return {
                processing: false,
                user: action.payload
            }
        
        case LOGOUT:
            return {}

        default:
            return state
    }
}