import { all, fork } from 'redux-saga/effects'
import * as authSagas from './sagas_auth/watchersOfAuth'
import * as projectsSagas from './sagas_projects/watchersOfProjects'

export default function * rootSaga () {
  yield all([
    ...Object.values(authSagas),
    ...Object.values(projectsSagas)
  ].map(fork))
}
