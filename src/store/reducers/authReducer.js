import { LOGIN, LOGOUT, SET_TOKEN } from '../actions/actionTypes'

const initialState = {
  token: '',
  uid: '',
  email: '',
  refreshToken: '',
  isAuth: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload,
        isAuth: true
      }
    }
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token
      }
    }
    case LOGOUT: {
      return initialState
    }
    default: {
      return state
    }
  }
}

/* Selectors */

export const getToken = state => state.auth.token

export const getUID = state => state.auth.uid

export default auth
