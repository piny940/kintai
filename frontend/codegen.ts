import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../backend/graph/schema/*.gql',
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/graphql/types/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        scalars: {
          Time: 'Dayjs.Dayjs',
          Uint: 'number',
        },
        withHooks: true,
      },
    },
  },
}
export default config
