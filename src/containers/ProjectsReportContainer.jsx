import React from 'react'
import { useSelector } from 'react-redux'
import { getProjects } from '../store/reducers/projectsReducer'
import ListOfProjectReports from '../pages/ListOfProjectReports'

const ProjectsReportContainer = () => {
  const projects = useSelector(getProjects)
  return <ListOfProjectReports projects={projects} />
}

export default ProjectsReportContainer
