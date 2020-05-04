export const transformerCollection = data => {
  const res = []
  data.forEach(collection =>
    res.push({
      id: collection.id,
      ...collection.data()
    })
  )
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
