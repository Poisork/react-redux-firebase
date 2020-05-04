import React from 'react'
import { useHandlerClickForm } from '../hooks/useFormHook'

export const ForgotPassword = () => {
  const { register, handlerClick, errors } = useHandlerClickForm({})

  return (
    <form className='row'>
      <div className="col s6 offset-s3">
        <h1>Forgot Password</h1>
        <div className="card purple darken-3">
          <div className="card-content white-text">
            <span className="card-title">Forgot Password</span>
            <div>

              <div className="input-field">
                <input
                  id="forgot-email"
                  type="email"
                  name="email"
                  ref={register({
                    required: 'Required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'invalid email address'
                    }
                  })}
                />
                <label htmlFor="forgot-email">Email</label>
                {errors.email && errors.email.message}
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className='btn yellow darken-4 waves-effect waves-light'
              data-type='forgot'
              onClick={handlerClick}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
