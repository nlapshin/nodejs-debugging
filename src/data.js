import range from 'lodash.range';

const USERS_COUNT = 1000

const user = {
  name: 'Nik',
  email: 'nik@mail.com',
  like: 10
}

const users = range(USERS_COUNT).reduce((res, users) => {
  res.push(user)

  return res
}, [])

export default {
  user,
  users
}
