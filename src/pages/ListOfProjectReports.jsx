import React from 'react'
import T from 'prop-types'
import ProjectReport from '../components/ProjectReport'

const ListOfProjectReports = ({ projects }) => {
  return (
    <ul className="collection with-header">
      <li className="collection-header center"><h4>Projects report</h4></li>
      {projects.map(project => {
        const countTasks = project.taskList.length
        const countCompletedTask = project.taskList.filter(task => task.done).length
        const allTaskCompleted = countCompletedTask === countTasks && countTasks > 0

        return (
          <ProjectReport
            key={project.id}
            title={project.title}
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
  })).isRequired
}

export default ListOfProjectReports
