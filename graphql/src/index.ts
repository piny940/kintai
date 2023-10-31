import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { serialize } from 'object-to-formdata'

const schema = loadSchemaSync('src/index.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const HOST = 'http://localhost:8080/v1'

const resolvers = {
  Query: {
    worker: async () => {
      const response = await fetch(`${HOST}/workers/me`, {
        credentials: 'include',
      })
      const json = (await response.json()) as any
      console.log(json)
      return json.worker
    },
  },
  Mutation: {
    login: async (_, args: { email: string; password: string }) => {
      const response = await fetch(`${HOST}/session`, {
        method: 'POST',
        body: serialize({ email: args.email, password: args.password }),
        credentials: 'include',
      })
      const json = (await response.json()) as any
      return json.worker
    },
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
