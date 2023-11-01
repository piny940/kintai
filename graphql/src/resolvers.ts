import { login, logout } from './resolvers/session'
import { getMe } from './resolvers/worker'

export const resolvers = {
  Query: {
    me: getMe,
  },
  Mutation: {
    login: login,
    logout: logout,
  },
}
