import React from 'react'
import { useHandlerClickForm } from '../hooks/useFormHook'

export const AuthPage = () => {
  const { register, handlerClick, errors } = useHandlerClickForm({})

  return (
    <form className='row'>
      <div className="col s6 offset-s3">
        <h1>Auth</h1>
        <div className="card purple darken-3">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
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
                <label htmlFor="email">Email</label>
                {errors.email && errors.email.message}
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="on"
                  ref={register({
                    required: 'Required',
                    minLength: {
                      value: 3,
                      message: 'min lenght 3 symbols'
                    }
                  })}
                />
                <label htmlFor="password">Password</label>
                {errors.password && errors.password.message}
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className='btn yellow darken-4 waves-effect waves-light mr10'
              data-type='login'
              onClick={handlerClick}
            >
              Login
            </button>
            <button
              className='btn grey lighten-1 black-text waves-effect waves-light'
              data-type='signup'
              onClick={handlerClick}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
