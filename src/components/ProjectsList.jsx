import React from 'react'
import T from 'prop-types'
import ProjectContainer from '../containers/ProjectContainer'
import ImmutablePropTypes from 'react-immutable-proptypes'

const ProjectsList = ({ projects, deleteProjectHandler }) => {
  return (
    projects.valueSeq().map(data =>
      <ProjectContainer
        key={data.get('id')}
        data={data}
        deleteProjectHandler={deleteProjectHandler}
      />
    )
  )
}

ProjectsList.propTypes = {
  projects: ImmutablePropTypes.orderedMapOf(ImmutablePropTypes.map).isRequired,
  deleteProjectHandler: T.func
}

export default ProjectsList
