import { take, fork } from 'redux-saga/effects'
import {
  workerCreateProject,
  workerPullProjects,
  workerRemoveProject,
  workerUpdateProject,
  workerUpdateTask,
  workerCreateTask,
  workerRemoveTask
} from './workersOfProjects'
import { workerPullUsers } from '../sagas_auth/workersOfAuth'

export function * pullProjects () {
  while (true) {
    yield take('LOGIN')
    yield fork(workerPullProjects)
    yield fork(workerPullUsers)
  }
}

export function * createProject () {
  while (true) {
    const { payload } = yield take('saga_create_project')
    yield fork(workerCreateProject, payload)
  }
}

export function * removeProject () {
  while (true) {
    const { id } = yield take('saga_REMOVE_PROJECT')
    yield fork(workerRemoveProject, id)
  }
}

export function * updateProject () {
  while (true) {
    const { payload } = yield take('saga_edit_project')
    yield fork(workerUpdateProject, payload)
  }
}

export function * updateTask () {
  while (true) {
    const { payload } = yield take('saga_update_task')
    yield fork(workerUpdateTask, payload)
  }
}

export function * createTask () {
  while (true) {
    const { payload } = yield take('saga_create_task')
    yield fork(workerCreateTask, payload)
  }
}

export function * removeTask () {
  while (true) {
    const { payload } = yield take('saga_remove_task')
    yield fork(workerRemoveTask, payload)
  }
}
