import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'

const schema = loadSchemaSync('src/index.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const HOST = 'http://localhost:8080'

const resolvers = {
  Query: {
    worker: async () => {
      const response = await fetch(`${HOST}/workers/me`)
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
