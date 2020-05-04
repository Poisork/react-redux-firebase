import React, { useCallback } from 'react'
import T from 'prop-types'
import PopupModal from '../services/popup-service'
import EditProjectForm from '../components/EditProjectForm'
import { useDispatch, useSelector } from 'react-redux'
import ComponentTaskForm from '../components/ComponentTaskForm'
import { uuidv4 } from '../utils/common'
import { getUID } from '../store/reducers/authReducer'
import { getUsers } from '../store/reducers/usersReducer'
import Project from '../components/Project'

const ProjectContainer = ({ data, ...props }) => {
  const { title, desc, id } = data

  const dispatch = useDispatch()
  const UID = useSelector(getUID)
  const users = useSelector(getUsers)

  const editProjectHandler = () => {
    PopupModal.modal({
      message: closeModal => (
        <EditProjectForm
          closeHandler={closeModal}
          title={title}
          desc={desc}
          id={id}
        />
      )
    })
  }

  const changeInputHandler = useCallback(({ done, ...dataTask }) => {
    dispatch({ type: 'saga_update_task', payload: { ...dataTask, done: !done, idProject: id } })
  }, [])

  const editTaskHandler = useCallback(dataTask => {
    PopupModal.modal({
      message: closeModal => (
        <ComponentTaskForm
          closeHandler={closeModal}
          data={dataTask}
          idProject={id}
          createTask={false}
          users={users}
        />
      )
    })
  }, [users])

  const createTaskHandler = () => {
    const dataTask = {
      done: false,
      idTask: uuidv4(),
      idUser: '',
      title: ''
    }
    PopupModal.modal({
      message: closeModal => (
        <ComponentTaskForm
          closeHandler={closeModal}
          data={dataTask}
          idProject={id}
          createTask={true}
          users={users}
        />
      )
    })
  }

  const removeTaskHadler = useCallback(event => {
    const { id_task } = event.target.dataset
    dispatch({ type: 'saga_remove_task', payload: { idTask: id_task, idProject: id } })
  }, [])

  return (
    <Project
      data={data}
      UID={UID}
      editProjectHandler={editProjectHandler}
      changeInputHandler={changeInputHandler}
      editTaskHandler={editTaskHandler}
      createTaskHandler={createTaskHandler}
      removeTaskHandler={removeTaskHadler}
      {...props}
    />
  )
}

ProjectContainer.propTypes = {
  data: T.shape({
    desc: T.string,
    id: T.string,
    taskList: T.arrayOf(T.shape({
      done: T.bool,
      idTask: T.string,
      idUser: T.string,
      title: T.string
    })),
    title: T.string
  }).isRequired,
  deleteProjectHandler: T.func
}

export default ProjectContainer
