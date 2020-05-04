import React from 'react'
import T from 'prop-types'
import TaskItem from './TaskItem'

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
  const { title, desc, id, taskList } = data

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
              taskList.length > 0 &&
              <ul className="collection scroll">
                {taskList.map(({ idTask, idUser, done, title }) => {
                  const taskForUser = idUser === UID
                  return (
                    <TaskItem
                      key={idTask}
                      changeInputHandler={changeInputHandler}
                      editTaskHandler={editTaskHandler}
                      removeTaskHandler={removeTaskHandler}
                      taskForUser={taskForUser}
                      idTask={idTask}
                      done={done}
                      title={title}
                      idUser={idUser}
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
  data: T.shape({
    desc: T.string,
    id: T.string,
    taskList: T.arrayOf(T.shape({
      done: T.bool,
      idTask: T.string,
      idUser: T.string,
      title: T.string
    })),
    title: T.string
  }).isRequired,
  UID: T.string,
  deleteProjectHandler: T.func,
  editProjectHandler: T.func,
  changeInputHandler: T.func,
  editTaskHandler: T.func,
  createTaskHandler: T.func,
  removeTaskHandler: T.func
}

export default Project
