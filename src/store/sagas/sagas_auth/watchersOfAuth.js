import { take, fork, call } from 'redux-saga/effects'
import { login, syncUserSaga, registerUser, resetPass } from './workersOfAuth'

export function * syncUserData () {
  while (true) {
    yield call(syncUserSaga)
  }
}

export function * signIn () {
  while (true) {
    const { payload } = yield take('saga_login')
    yield fork(login, payload)
  }
}

export function * signUp () {
  while (true) {
    const { payload } = yield take('saga_signup')
    yield fork(registerUser, payload)
  }
}

export function * sendPasswordReset () {
  while (true) {
    const { payload: { email } } = yield take('saga_forgot')
    yield call(resetPass, email)
  }
}
