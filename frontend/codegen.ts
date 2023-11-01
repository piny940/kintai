import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../backend/graph/schema/*.graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/graphql/types/index.d.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
  },
}
export default config
