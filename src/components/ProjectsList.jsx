import React from 'react'
import T from 'prop-types'
import ProjectContainer from '../containers/ProjectContainer'

const ProjectsList = ({ projects, deleteProjectHandler }) => {
  return (
    projects.map(data =>
      <ProjectContainer
        key={data.id}
        data={data}
        deleteProjectHandler={deleteProjectHandler}
      />
    )
  )
}

ProjectsList.propTypes = {
  projects: T.arrayOf(T.shape({
    desc: T.string,
    id: T.string,
    taskList: T.arrayOf(T.shape({
      done: T.bool,
      idTask: T.string,
      idUser: T.string,
      title: T.string
    })),
    title: T.string
  })).isRequired,
  deleteProjectHandler: T.func
}

export default ProjectsList
