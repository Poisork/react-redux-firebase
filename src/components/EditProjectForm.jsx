import React, { useRef, useEffect } from 'react'
import { useHandlerClickForm } from '../hooks/useFormHook'
import T from 'prop-types'

const EditProjectForm = ({ closeHandler, title, desc, id }) => {
  const { register, handlerClick, errors } = useHandlerClickForm({
    defaultValues: {
      title,
      desc
    }
  }, false, closeHandler)

  const titleRef = useRef()
  const descRef = useRef()

  useEffect(() => {
    titleRef.current.focus()
    descRef.current.focus()
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
        <h2 className='center'>EDIT PROJECT</h2>

        <div className="input-field col s12">
          <i className="material-icons prefix">title</i>
          <input
            type="text"
            id="edit-project"
            name='title'
            ref={(e) => {
              register(e, {
                required: 'Required',
                minLength: {
                  value: 3,
                  message: 'min lenght 3 symbols'
                },
                maxLength: {
                  value: 40,
                  message: 'max lenght 40 symbols'
                }
              })
              titleRef.current = e
            }}
          />
          <label htmlFor="edit-project">Title</label>
          {errors.title && 'Title ' + errors.title.message}

        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">description</i>
          <input
            type="text"
            id="edit-desc"
            name='desc'
            ref={(e) => {
              register(e, {
                required: 'Required',
                minLength: {
                  value: 3,
                  message: 'min lenght 3 symbols'
                },
                maxLength: {
                  value: 250,
                  message: 'max lenght 250 symbols'
                }
              })
              descRef.current = e
            }}
          />
          <label htmlFor="edit-desc">Description</label>
          {errors.desc && 'Description ' + errors.desc.message}
        </div>

        <div className="col s12 right-align">
          <button
            className='btn yellow darken-4 waves-effect waves-light mr10'
            data-type='edit_project'
            data-id={id}
            onClick={handlerClick}
          >
            Edit Project
          </button>
        </div>

      </div>
    </form>
  )
}

EditProjectForm.propTypes = {
  title: T.string.isRequired,
  desc: T.string.isRequired,
  id: T.string.isRequired,
  closeHandler: T.func.isRequired
}

export default EditProjectForm
