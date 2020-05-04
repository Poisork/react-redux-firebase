import React from 'react'
import T from 'prop-types'

const TaskItem = ({
  title,
  done,
  idTask,
  idUser,
  changeInputHandler,
  editTaskHandler,
  removeTaskHandler,
  taskForUser
}) => {
  const dataTask = { title, done, idTask, idUser }

  return (
    <li className="collection-item">
      <label>
        <input type="checkbox"
          checked={done}
          onChange={changeInputHandler.bind(null, dataTask)}
        />
        <span>{title}</span>
      </label>
      <div className="secondary-content flex">
        {taskForUser ? <span>Your task</span> : null}
        <i
          onClick={editTaskHandler.bind(null, dataTask)}
          className="material-icons yellow-text text-darken-4 pointer"
        >
          edit
        </i>
        <i
          onClick={removeTaskHandler}
          data-id_task={idTask}
          className="material-icons deep-orange-text pointer">
            delete
        </i>
      </div>
    </li>
  )
}

TaskItem.propTypes = {
  done: T.bool,
  title: T.string,
  idTask: T.string,
  idUser: T.string,
  changeInputHandler: T.func.isRequired,
  editTaskHandler: T.func.isRequired,
  removeTaskHandler: T.func.isRequired,
  taskForUser: T.bool.isRequired
}

export default React.memo(TaskItem)
