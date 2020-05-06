import { SET_USERS } from '../actions/actionTypes'

const initialState = {
  data: {}
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        data: action.payload
      }
    }
    default: {
      return state
    }
  }
}

/* Selectors */

export const getUsers = state => state.users.data

export default users
