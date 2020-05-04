import React from 'react'
import { useHandlerClickForm } from '../hooks/useFormHook'

const ProjectsForm = () => {
  const { register, handlerClick, errors } = useHandlerClickForm({}, true)

  return (
    <form className="row">
      <div className="col s12">
        <h2 className='center'>CREATE PROJECT</h2>

        <div className="input-field col s12">
          <i className="material-icons prefix">title</i>
          <input
            type="text"
            id="title-project"
            name='title'
            ref={register({
              required: 'Required',
              minLength: {
                value: 3,
                message: 'min lenght 3 symbols'
              },
              maxLength: {
                value: 40,
                message: 'max lenght 40 symbols'
              }
            })}
          />
          <label htmlFor="title-project">Title</label>
          {errors.title && 'Title ' + errors.title.message}
        </div>

        <div className="input-field col s12">
          <i className="material-icons prefix">description</i>
          <input
            type="text"
            id="desc-project"
            name='desc'
            ref={register({
              required: 'Required',
              minLength: {
                value: 3,
                message: 'min lenght 3 symbols'
              },
              maxLength: {
                value: 250,
                message: 'max lenght 250 symbols'
              }
            })}
          />
          <label htmlFor="desc-project">Description</label>
          {errors.desc && 'Description ' + errors.desc.message}
        </div>

        <div className="col s12">
          <button
            className='btn yellow darken-4 waves-effect waves-light'
            data-type='create_project'
            onClick={handlerClick}
          >
            Create Project
          </button>
        </div>

      </div>
    </form>
  )
}

export default ProjectsForm
