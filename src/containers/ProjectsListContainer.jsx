import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PopupModal from '../services/popup-service'
import { getProjects } from '../store/reducers/projectsReducer'
import ProjectsList from '../components/ProjectsList'

const ProjectsListContainer = () => {
  const projects = useSelector(getProjects)
  const dispatch = useDispatch()

  const deleteProject = useCallback(event => {
    const { id } = event.target.dataset
    PopupModal.confirm({
      message: 'Do you really want remove this project?',
      left: {
        text: 'Yes',
        onClick: () => dispatch({ type: 'saga_REMOVE_PROJECT', id })
      },
      right: {
        text: 'No',
        onClick: () => { }
      }
    })
  }, [])

  if (projects.length) {
    return <ProjectsList projects={projects} deleteProjectHandler={deleteProject} />
  }
  return null
}

export default ProjectsListContainer
