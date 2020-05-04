import React from 'react'
import T from 'prop-types'

const ProjectReport = ({ title, countTasks, countCompletedTask, allTaskCompleted }) => {
  return (
    <li
      className="collection-item"
    >
      <div>{title}
        <div className="secondary-content flex">
          total tasks: {countTasks} <i className="material-icons">work</i>
          tasks completed: {countCompletedTask}
          <i className="material-icons">
            {allTaskCompleted ? 'check_box' : 'check_box_outline_blank'}
          </i>
        </div>
      </div>
    </li>
  )
}

ProjectReport.propTypes = {
  title: T.string,
  countTasks: T.number,
  countCompletedTask: T.number,
  allTaskCompleted: T.bool
}

export default React.memo(ProjectReport)
