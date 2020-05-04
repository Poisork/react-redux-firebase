import { SET_PROJECTS } from '../actions/actionTypes'

const initialState = {
  data: []
}

const projects = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS: {
      return {
        data: action.payload
      }
    }
    default: {
      return state
    }
  }
}

/* Selectors */

export const getProjects = state => state.projects.data

export default projects
