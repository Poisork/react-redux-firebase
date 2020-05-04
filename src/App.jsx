import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes/routes'
import { useSelector } from 'react-redux'
import { getToken } from './store/reducers/authReducer'
import './styles/index.scss'
import 'materialize-css'
import './styles/popup.scss'

export const App = () => {
  const token = useSelector(getToken)
  const routes = useRoutes(token)

  return (
    <div className="container">
      <Router>
        {routes}
      </Router>
    </div>
  )
}
