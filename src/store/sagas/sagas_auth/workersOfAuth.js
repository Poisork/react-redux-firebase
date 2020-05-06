import { take, call, put, fork } from 'redux-saga/effects'
import rsf from '../instanceSagaFireBase'
import { parseUser, transformerCollection, usersCollection } from '../../../utils/common'
import actionCreators from '../../actions/actionCreators'
import { setProjects } from '../../reducers/projectsReducer'
import { useMessage } from '../../../utils/notification'

export function * syncUserSaga () {
  const channel = yield call(rsf.auth.channel)
  while (true) {
    const data = yield take(channel)
    const { user } = data
    if (user) {
      const dataUser = yield parseUser(user)
      yield put(actionCreators.login(dataUser))
      useMessage('You are logged in')
      yield take('saga-signOut')
      yield fork(logout)
    }
  }
}

export function * login ({ email, password }) {
  try {
    yield call(rsf.auth.signInWithEmailAndPassword, email, password)
  } catch (error) {
    useMessage(error.message)
  }
}

export function * registerUser ({ email, password }) {
  try {
    const { user } = yield call(rsf.auth.createUserWithEmailAndPassword, email, password)
    const dataUser = parseUser(user)
    const { uid } = dataUser
    yield call(
      rsf.firestore.setDocument,
      `users/${uid}`,
      { email }
    )
  } catch (error) {
    useMessage(error.message)
  }
}

export function * logout () {
  try {
    yield call(rsf.auth.signOut)
    yield put(actionCreators.logout())
    yield put(actionCreators.setUsers([]))
    yield put(setProjects([]))
    useMessage('You are logged out')
  } catch (error) {
    useMessage('You cant logged out')
  }
}

export function * resetPass (email) {
  try {
    yield call(rsf.auth.sendPasswordResetEmail, email)
    useMessage('Check your email')
  } catch (error) {
    useMessage('Cant send reset pass')
  }
}

export function * workerPullUsers () {
  try {
    yield fork(
      rsf.firestore.syncCollection,
      'users',
      {
        successActionCreator: actionCreators.setUsers,
        transform: transformerCollection.bind(null, usersCollection)
      }
    )
  } catch (error) {
    useMessage('Can"t sync users')
  }
}
