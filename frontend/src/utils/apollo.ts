import { ApolloClient, InMemoryCache } from '@apollo/client'
import dayjs from 'dayjs'

const resolvers = {
  Time: {
    __resolveType(obj: string) {
      return dayjs(obj)
    },
  },
}

export const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
  cache: new InMemoryCache(),
  credentials: 'include',
  resolvers,
})
