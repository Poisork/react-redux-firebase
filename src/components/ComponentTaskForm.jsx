import React, { useRef, useEffect } from 'react'
import { useHandlerClickForm } from '../hooks/useFormHook'
import T from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import ReactAutocomplete from 'react-autocomplete'

const ComponentTaskForm = ({ closeHandler, data, idProject, createTask, users }) => {
  const { title, idUser, idTask, done } = data

  const { register, handlerClick, errors, control, Controller } = useHandlerClickForm({
    defaultValues: {
      title,
      idUser
    }
  }, false, closeHandler)

  const messageSubmit = createTask ? 'CREATE TASK' : 'EDIT TASK'
  const typeSubmit = createTask ? 'create_task' : 'update_task'

  const items = users.valueSeq().map(user => {
    const item = {}
    item.id = user.get('id')
    item.label = user.get('email')
    return item
  })

  const firstFIeldRef = useRef()

  useEffect(() => {
    if (!createTask) {
      firstFIeldRef.current.focus()
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
              firstFIeldRef.current = e
            }}
          />
          <label htmlFor="title">Title</label>
          {errors.title && 'Title ' + errors.title.message}

        </div>
        <div className="input-field col s12">
          <div>
            <Controller
              as={ReactAutocomplete}
              rules={{ required: true }}
              name="idUser"
              control={control}
              defaultValue={idUser}
              items={items.toJS()}
              getItemValue={item => item.id}
              renderItem={(item, highlighted) =>
                <div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                >
                  {item.label}
                </div>
              }
              onSelect={value => control.setValue('idUser', value)}
            />
          </div>
          <label className="pl20">Id user</label>
          <div> {errors.idUser && 'id User required'}</div>
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
  closeHandler: T.func.isRequired,
  users: ImmutablePropTypes.orderedMapOf(ImmutablePropTypes.map).isRequired
}

export default ComponentTaskForm
