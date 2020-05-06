import { LOGIN, LOGOUT, SET_TOKEN, SET_USERS } from './actionTypes'

const actionCreators = {
  login: payload => ({ type: LOGIN, payload }),
  logout: () => ({ type: LOGOUT }),
  setUsers: payload => ({ type: SET_USERS, payload }),
  setToken: token => ({ type: SET_TOKEN, token })
}

export default actionCreators
