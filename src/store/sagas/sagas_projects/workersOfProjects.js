import { setProjects } from '../../reducers/projectsReducer'
import { call, fork, select } from 'redux-saga/effects'
import rsf from '../instanceSagaFireBase'
import { transformerCollection, projectsCollection } from '../../../utils/common'
import { getProjects } from '../../reducers/projectsReducer'
import { useMessage } from '../../../utils/notification'

export function * workerCreateProject (payload) {
  try {
    yield call(
      rsf.firestore.addDocument,
      'projects',
      { ...payload, taskList: [] }
    )
    // yield put(createProject({ ...payload, taskList: [], id: document.id }))
    useMessage('Project created')
  } catch (error) {
    useMessage('Project can"t be created')
  }
}

export function * workerPullProjects () {
  try {
    yield fork(
      rsf.firestore.syncCollection,
      'projects',
      {
        successActionCreator: setProjects,
        transform: transformerCollection.bind(null, projectsCollection)
      }
    )
  } catch (error) {
    useMessage('Can"t sync data')
  }
}

export function * workerRemoveProject (id) {
  try {
    yield call(rsf.firestore.deleteDocument, `projects/${id}`)
    useMessage('Project has been removed')
  } catch (error) {
    useMessage('Can"t remove project')
  }
}

export function * workerUpdateProject (payload) {
  try {
    const { title, desc, id } = payload
    yield call(rsf.firestore.updateDocument, `projects/${id}`, { title, desc })
    useMessage('Project has been updated')
  } catch (error) {
    useMessage('Can"t update project')
  }
}

export function * workerUpdateTask (payload) {
  const { done, idProject, title, idTask, idUser } = payload
  let taskList = yield selectProjectTaskList(idProject)

  taskList = taskList.map(task => {
    if (task.idTask === idTask) {
      task = { ...task, done, title, idUser }
    }
    return task
  })
  try {
    yield call(rsf.firestore.updateDocument, `projects/${idProject}`, { taskList })
    useMessage('Task has been updated')
  } catch (error) {
    useMessage(error.message)
  }
}

export function * workerCreateTask ({ idProject, ...payload }) {
  let taskList = yield selectProjectTaskList(idProject)
  taskList = taskList.concat(payload)
  try {
    yield call(rsf.firestore.updateDocument, `projects/${idProject}`, { taskList })
    useMessage('Task has been created')
  } catch (error) {
    useMessage('Can"t create task')
  }
}

export function * workerRemoveTask ({ idProject, idTask }) {
  let taskList = yield selectProjectTaskList(idProject)
  taskList = taskList.filter(task => task.idTask !== idTask)
  try {
    yield call(rsf.firestore.updateDocument, `projects/${idProject}`, { taskList })
    useMessage('Task has been removed')
  } catch (error) {
    useMessage('Can"t remove task')
  }
}

function * selectProjectTaskList (idProject) {
  const projects = yield select(getProjects)
  const project = projects.get(idProject)
  let taskList = project.get('taskList').toJS()
  taskList = Object.values(taskList)

  return taskList
}
