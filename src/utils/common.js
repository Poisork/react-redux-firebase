import { Map, OrderedMap } from 'immutable'

export const transformerCollection = (collectionHandler, data) => {
  let res = OrderedMap()
  data.forEach(collection => {
    res = res.set(collection.id, collectionHandler(collection))
  })
  return res
}

export function usersCollection (collection) {
  return Map({
    id: collection.id,
    ...collection.data()
  })
}

export function projectsCollection (collection) {
  return Map({
    id: collection.id,
    ...collection.data(),
    taskList: transformArrayToOrderMap(collection.data().taskList)
  })
}

const transformArrayToOrderMap = arr => {
  let res = OrderedMap()

  arr.forEach(({ idTask, ...item }) => (
    res = res.set(idTask,
      Map({ idTask, ...item })
    )
  ))
  return res
}

export const parseUser = user => {
  const res = {}
  res.token = user.xa
  res.uid = user.uid
  res.email = user.email
  res.refreshToken = user.refreshToken
  return res
}

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
