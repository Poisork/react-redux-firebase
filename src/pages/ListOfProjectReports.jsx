import React from 'react'
import ProjectReport from '../components/ProjectReport'
import ImmutablePropTypes from 'react-immutable-proptypes'

const ListOfProjectReports = ({ projects }) => {
  return (
    <ul className="collection with-header">
      <li className="collection-header center"><h4>Projects report</h4></li>
      {projects.valueSeq().map(project => {
        const countTasks = project.get('taskList').size
        const countCompletedTask = project.get('taskList').filter(task => task.get('done')).size
        const allTaskCompleted = countCompletedTask === countTasks && countTasks > 0

        return (
          <ProjectReport
            key={project.get('id')}
            title={project.get('title')}
            countTasks={countTasks}
            countCompletedTask={countCompletedTask}
            allTaskCompleted={allTaskCompleted}
          />
        )
      })}
    </ul>
  )
}

ListOfProjectReports.propTypes = {
  projects: ImmutablePropTypes.orderedMapOf(ImmutablePropTypes.map).isRequired
}

export default ListOfProjectReports
