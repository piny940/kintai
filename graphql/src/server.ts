import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { login, logout } from './resolvers/session'
import { getMe } from './resolvers/worker'

const schema = loadSchemaSync('src/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const resolvers = {
  Query: {
    me: getMe,
  },
  Mutation: {
    login,
    logout,
  },
}

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
})

const server = new ApolloServer({
  schema: schemaWithResolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
