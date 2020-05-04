import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import Navbar from '../components/Navbar'
import { ForgotPassword } from '../pages/ForgotPassword'
import { useDispatch } from 'react-redux'

const Projects = lazy(() => import('../pages/Projects'))
const ProjectsReportContainer = lazy(() => import('../containers/ProjectsReportContainer'))

export const useRoutes = isAuthenticated => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch({ type: 'saga-signOut' })
  }

  if (isAuthenticated) {
    return (
      <Suspense
        fallback={
          <div className="progress purple">
            <div className="indeterminate"></div>
          </div>
        }
      >

        <Navbar
          links={[['projects', 'Projects'], ['projectsReport', 'Projects report']]}
          rightSide
          cb={logoutHandler}
        />

        <Switch>
          <Route path='/projects' exact>
            <Projects />
          </Route>
          <Route path='/projectsReport' exact>
            <ProjectsReportContainer />
          </Route>
          <Redirect to="/projects" />
        </Switch>

      </Suspense>
    )
  }

  return (
    <>
      <Navbar
        links={[['auth', 'Login/SignUp'], ['forgot', 'Forgot password']]}
        rightSide={false}
      />

      <Switch>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Route path="/forgot" exact>
          <ForgotPassword />
        </Route>
        <Redirect to="/auth" />

      </Switch>
    </>
  )
}
