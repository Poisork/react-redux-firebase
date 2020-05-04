import React, { useRef, useEffect } from 'react'
import { useHandlerClickForm } from '../hooks/useFormHook'
import T from 'prop-types'

const ComponentTaskForm = ({ closeHandler, data, idProject, createTask }) => {
  const { title, idUser, idTask, done } = data
  const { register, handlerClick, errors } = useHandlerClickForm({
    defaultValues: {
      title,
      idUser
    }
  }, false, closeHandler)

  const messageSubmit = createTask ? 'CREATE TASK' : 'EDIT TASK'
  const typeSubmit = createTask ? 'create_task' : 'update_task'

  const firstFiedlRef = useRef()
  const secondFieldRef = useRef()

  useEffect(() => {
    if (!createTask) {
      firstFiedlRef.current.focus()
      secondFieldRef.current.focus()
    }
  }, [])

  return (
    <form className="row relative">
      <div
        className='absolute-right'
        onClick={closeHandler}
      >
        <i className="material-icons prefix">close</i>
      </div>
      <div className="col s12">
        <h2 className='center'>{messageSubmit}</h2>

        <div className="input-field col s12">
          <i className="material-icons prefix">title</i>
          <input
            type="text"
            id="title"
            name='title'
            ref={(e) => {
              register(e, {
                required: 'Required',
                minLength: {
                  value: 3,
                  message: 'min lenght 3 symbols'
                },
                maxLength: {
                  value: 15,
                  message: 'max lenght 15 symbols'
                }
              })
              firstFiedlRef.current = e
            }}
          />
          <label htmlFor="title">Title</label>
          {errors.title && 'Title ' + errors.title.message}

        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">sentiment_very_satisfied</i>
          <input
            type="text"
            id="idUser"
            name='idUser'
            ref={(e) => {
              register(e, {
                required: 'Required'
              })
              secondFieldRef.current = e
            }}
          />
          <label htmlFor="idUser">Id user</label>
          {errors.idUser && 'id User ' + errors.idUser.message}
        </div>

        <div className="col s12 right-align">
          <button
            className='btn yellow darken-4 waves-effect waves-light mr10'
            data-type={typeSubmit}
            data-project_id={idProject}
            data-task_id ={idTask}
            data-done={String(done)}
            onClick={handlerClick}
          >
            {messageSubmit}
          </button>
        </div>

      </div>
    </form>
  )
}

ComponentTaskForm.propTypes = {
  data: T.shape({
    title: T.string.isRequired,
    idUser: T.string.isRequired,
    idTask: T.string.isRequired,
    done: T.bool.isRequired
  }),
  idProject: T.string.isRequired,
  createTask: T.bool.isRequired,
  closeHandler: T.func.isRequired
}

export default ComponentTaskForm
