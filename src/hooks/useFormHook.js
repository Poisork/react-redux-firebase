import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export function useHandlerClickForm (options, needReset, cb = () => {}) {
  const { register, getValues, triggerValidation, errors, reset, control } = useForm(options)
  const dispatch = useDispatch()

  const handlerClick = async event => {
    const { target: { dataset } } = event
    event.preventDefault()

    const { type } = dataset
    const { id } = dataset
    const { task_id } = dataset
    const { done } = dataset
    const { project_id } = dataset

    const typeHandler = 'saga_' + type
    const valid = await triggerValidation()

    if (valid) {
      const data = getValues()
      if (id) {
        data.id = id
      }
      if (task_id) {
        data.idTask = task_id
        data.done = done === 'true'
        data.idProject = project_id
      }
      dispatch({ type: typeHandler, payload: data })

      if (needReset) {
        reset()
      }
      cb()
    }
  }

  return { register, handlerClick, errors, Controller, control }
}
