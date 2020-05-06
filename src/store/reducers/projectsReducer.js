import { OrderedMap } from 'immutable'

export const SET_PROJECTS = 'SET_PROJECTS'

const initialState = {
  data: OrderedMap()
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

/* Action Creators */

export const setProjects = payload => ({ type: SET_PROJECTS, payload })

/* Selectors */

export const getProjects = state => state.projects.data

export default projects
