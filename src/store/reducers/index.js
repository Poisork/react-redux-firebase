import { combineReducers } from 'redux'

import auth from './authReducer'
import projects from './projectsReducer'
import users from './usersReducer'

const rootReducer = combineReducers({
  auth,
  projects,
  users
})

export default rootReducer
