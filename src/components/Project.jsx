import React from 'react'
import T from 'prop-types'
import TaskItem from './TaskItem'
import ImmutablePropTypes from 'react-immutable-proptypes'

const Project = ({
  data,
  UID,
  deleteProjectHandler,
  editProjectHandler,
  changeInputHandler,
  editTaskHandler,
  createTaskHandler,
  removeTaskHandler
}) => {
  const { title, desc, id, taskList } = data.toJSON()
  return (
    <div className="row">
      <div className="col s12">
        <div className="card purple darken-3">
          <div className="card-content white-text">
            <span className="card-title">{title}</span>
            <p>{desc}</p>
          </div>

          <div className="card-content">
            <button
              onClick={createTaskHandler}
              className="waves-effect yellow darken-4 waves-light btn-large mr10"
            >
              <i className="material-icons  left">work</i>
                Create task
            </button>
            <h4 className="white-text">Task List</h4>

            {
              taskList.size > 0 &&
              <ul className="collection scroll">
                {taskList.valueSeq().map(task => {
                  const taskForUser = task.get('idUser') === UID
                  return (
                    <TaskItem
                      key={task.get('idTask')}
                      changeInputHandler={changeInputHandler}
                      editTaskHandler={editTaskHandler}
                      removeTaskHandler={removeTaskHandler}
                      taskForUser={taskForUser}
                      idTask={task.get('idTask')}
                      done={task.get('done')}
                      title={task.get('title')}
                      idUser={task.get('idUser')}
                    />
                  )
                })}
              </ul>
            }

          </div>

          <div className="card-action right-align">
            <button
              className="waves-effect yellow darken-4 waves-light btn-large mr10"
              onClick={editProjectHandler}
            >
              <i className="material-icons left">edit</i>
                edit
            </button>
            <button
              className="waves-effect deep-orange accent-4 waves-light btn-large"
              data-id={id}
              onClick={deleteProjectHandler}
            >
              <i className="material-icons left">delete</i>
                delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Project.propTypes = {
  data: ImmutablePropTypes.map.isRequired,
  UID: T.string,
  deleteProjectHandler: T.func,
  editProjectHandler: T.func,
  changeInputHandler: T.func,
  editTaskHandler: T.func,
  createTaskHandler: T.func,
  removeTaskHandler: T.func
}

export default Project
