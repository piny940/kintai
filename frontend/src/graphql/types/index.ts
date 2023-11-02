import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends Record<string, unknown>,
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Time: { input: string; output: string }
  Uint: { input: number; output: number }
}

export type Company = {
  __typename?: 'Company'
  createdAt: Scalars['Time']['output']
  employment: Employment
  employmentId: Scalars['Uint']['output']
  id: Scalars['Uint']['output']
  name: Scalars['String']['output']
  updatedAt: Scalars['Time']['output']
}

export type DesiredShift = {
  __typename?: 'DesiredShift'
  createdAt: Scalars['Time']['output']
  employmentId: Scalars['Uint']['output']
  id: Scalars['Uint']['output']
  since: Scalars['Time']['output']
  till: Scalars['Time']['output']
  updatedAt: Scalars['Time']['output']
}

export type Employment = {
  __typename?: 'Employment'
  companyId: Scalars['Int']['output']
  createdAt: Scalars['Time']['output']
  id: Scalars['Uint']['output']
  kind: EmploymentKind
  status: EmploymentStatus
  updatedAt: Scalars['Time']['output']
  workerId: Scalars['Int']['output']
}

export enum EmploymentKind {
  Admin = 'ADMIN',
  Member = 'MEMBER',
}

export enum EmploymentStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export type LoginResponse = {
  __typename?: 'LoginResponse'
  worker?: Maybe<Worker>
}

export type Mutation = {
  __typename?: 'Mutation'
  login?: Maybe<LoginResponse>
  logout: Scalars['Boolean']['output']
  pushStamp: Stamp
}

export type MutationLoginArgs = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationPushStampArgs = {
  companyId: Scalars['Uint']['input']
}

export type Query = {
  __typename?: 'Query'
  companies: Company[]
  company: Company
  desiredShifts: DesiredShift[]
  me?: Maybe<Worker>
  workStatus: WorkStatus
}

export type QueryCompanyArgs = {
  id: Scalars['Uint']['input']
}

export type QueryDesiredShiftsArgs = {
  companyId: Scalars['Uint']['input']
  fromTime?: InputMaybe<Scalars['Time']['input']>
  toTime?: InputMaybe<Scalars['Time']['input']>
}

export type QueryWorkStatusArgs = {
  companyId: Scalars['Uint']['input']
}

export type Stamp = {
  __typename?: 'Stamp'
  createdAt: Scalars['Time']['output']
  employmentID: Scalars['Uint']['output']
  id: Scalars['Uint']['output']
  stampedAt: Scalars['Time']['output']
  updatedAt: Scalars['Time']['output']
}

export enum WorkStatus {
  Left = 'LEFT',
  Working = 'WORKING',
}

export type Worker = {
  __typename?: 'Worker'
  createdAt: Scalars['Time']['output']
  email: Scalars['String']['output']
  id: Scalars['Uint']['output']
  name: WorkerName
  status: WorkerStatus
  updatedAt: Scalars['Time']['output']
  workStatus?: Maybe<WorkStatus>
}

export type WorkerName = {
  __typename?: 'WorkerName'
  firstName: Scalars['String']['output']
  lastName: Scalars['String']['output']
}

export enum WorkerStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export type GetCompanyQueryVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type GetCompanyQuery = {
  __typename?: 'Query'
  company: {
    __typename?: 'Company'
    id: number
    name: string
    createdAt: string
    updatedAt: string
    employment: {
      __typename?: 'Employment'
      id: number
      kind: EmploymentKind
      status: EmploymentStatus
      createdAt: string
      updatedAt: string
    }
  }
}

export type GetCompaniesQueryVariables = Exact<Record<string, never>>

export type GetCompaniesQuery = {
  __typename?: 'Query'
  companies: Array<{
    __typename?: 'Company'
    id: number
    name: string
    createdAt: string
    updatedAt: string
  }>
}

export type GetDesiredShiftsQueryVariables = Exact<{
  companyId: Scalars['Uint']['input']
}>

export type GetDesiredShiftsQuery = {
  __typename?: 'Query'
  desiredShifts: Array<{
    __typename?: 'DesiredShift'
    id: number
    since: string
    till: string
    employmentId: number
    createdAt: string
    updatedAt: string
  }>
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'LoginResponse'
    worker?: {
      __typename?: 'Worker'
      id: number
      status: WorkerStatus
      email: string
      createdAt: string
      updatedAt: string
      name: { __typename?: 'WorkerName'; firstName: string; lastName: string }
    } | null
  } | null
}

export type PushStampMutationVariables = Exact<{
  companyId: Scalars['Uint']['input']
}>

export type PushStampMutation = {
  __typename?: 'Mutation'
  pushStamp: { __typename?: 'Stamp'; id: number; stampedAt: string }
}

export type GetWorkStatusQueryVariables = Exact<{
  companyId: Scalars['Uint']['input']
}>

export type GetWorkStatusQuery = {
  __typename?: 'Query'
  workStatus: WorkStatus
}

export type GetMeQueryVariables = Exact<Record<string, never>>

export type GetMeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'Worker'
    id: number
    status: WorkerStatus
    email: string
    createdAt: string
    updatedAt: string
    name: { __typename?: 'WorkerName'; firstName: string; lastName: string }
  } | null
}

export const GetCompanyDocument = gql`
  query getCompany($id: Uint!) {
    company(id: $id) {
      id
      name
      employment {
        id
        kind
        status
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetCompanyQuery__
 *
 * To run a query within a React component, call `useGetCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCompanyQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCompanyQuery,
    GetCompanyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCompanyQuery, GetCompanyQueryVariables>(
    GetCompanyDocument,
    options
  )
}
export function useGetCompanyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompanyQuery,
    GetCompanyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCompanyQuery, GetCompanyQueryVariables>(
    GetCompanyDocument,
    options
  )
}
export function useGetCompanySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetCompanyQuery,
    GetCompanyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetCompanyQuery, GetCompanyQueryVariables>(
    GetCompanyDocument,
    options
  )
}
export type GetCompanyQueryHookResult = ReturnType<typeof useGetCompanyQuery>
export type GetCompanyLazyQueryHookResult = ReturnType<
  typeof useGetCompanyLazyQuery
>
export type GetCompanySuspenseQueryHookResult = ReturnType<
  typeof useGetCompanySuspenseQuery
>
export type GetCompanyQueryResult = Apollo.QueryResult<
  GetCompanyQuery,
  GetCompanyQueryVariables
>
export const GetCompaniesDocument = gql`
  query getCompanies {
    companies {
      id
      name
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetCompaniesQuery__
 *
 * To run a query within a React component, call `useGetCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompaniesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCompaniesQuery,
    GetCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(
    GetCompaniesDocument,
    options
  )
}
export function useGetCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompaniesQuery,
    GetCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(
    GetCompaniesDocument,
    options
  )
}
export function useGetCompaniesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetCompaniesQuery,
    GetCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(
    GetCompaniesDocument,
    options
  )
}
export type GetCompaniesQueryHookResult = ReturnType<
  typeof useGetCompaniesQuery
>
export type GetCompaniesLazyQueryHookResult = ReturnType<
  typeof useGetCompaniesLazyQuery
>
export type GetCompaniesSuspenseQueryHookResult = ReturnType<
  typeof useGetCompaniesSuspenseQuery
>
export type GetCompaniesQueryResult = Apollo.QueryResult<
  GetCompaniesQuery,
  GetCompaniesQueryVariables
>
export const GetDesiredShiftsDocument = gql`
  query getDesiredShifts($companyId: Uint!) {
    desiredShifts(companyId: $companyId) {
      id
      since
      till
      employmentId
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetDesiredShiftsQuery__
 *
 * To run a query within a React component, call `useGetDesiredShiftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDesiredShiftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDesiredShiftsQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetDesiredShiftsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetDesiredShiftsQuery,
    GetDesiredShiftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDesiredShiftsQuery, GetDesiredShiftsQueryVariables>(
    GetDesiredShiftsDocument,
    options
  )
}
export function useGetDesiredShiftsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDesiredShiftsQuery,
    GetDesiredShiftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetDesiredShiftsQuery,
    GetDesiredShiftsQueryVariables
  >(GetDesiredShiftsDocument, options)
}
export function useGetDesiredShiftsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetDesiredShiftsQuery,
    GetDesiredShiftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetDesiredShiftsQuery,
    GetDesiredShiftsQueryVariables
  >(GetDesiredShiftsDocument, options)
}
export type GetDesiredShiftsQueryHookResult = ReturnType<
  typeof useGetDesiredShiftsQuery
>
export type GetDesiredShiftsLazyQueryHookResult = ReturnType<
  typeof useGetDesiredShiftsLazyQuery
>
export type GetDesiredShiftsSuspenseQueryHookResult = ReturnType<
  typeof useGetDesiredShiftsSuspenseQuery
>
export type GetDesiredShiftsQueryResult = Apollo.QueryResult<
  GetDesiredShiftsQuery,
  GetDesiredShiftsQueryVariables
>
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      worker {
        id
        status
        email
        name {
          firstName
          lastName
        }
        createdAt
        updatedAt
      }
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const PushStampDocument = gql`
  mutation pushStamp($companyId: Uint!) {
    pushStamp(companyId: $companyId) {
      id
      stampedAt
    }
  }
`
export type PushStampMutationFn = Apollo.MutationFunction<
  PushStampMutation,
  PushStampMutationVariables
>

/**
 * __usePushStampMutation__
 *
 * To run a mutation, you first call `usePushStampMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePushStampMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pushStampMutation, { data, loading, error }] = usePushStampMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function usePushStampMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PushStampMutation,
    PushStampMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<PushStampMutation, PushStampMutationVariables>(
    PushStampDocument,
    options
  )
}
export type PushStampMutationHookResult = ReturnType<
  typeof usePushStampMutation
>
export type PushStampMutationResult = Apollo.MutationResult<PushStampMutation>
export type PushStampMutationOptions = Apollo.BaseMutationOptions<
  PushStampMutation,
  PushStampMutationVariables
>
export const GetWorkStatusDocument = gql`
  query getWorkStatus($companyId: Uint!) {
    workStatus(companyId: $companyId)
  }
`

/**
 * __useGetWorkStatusQuery__
 *
 * To run a query within a React component, call `useGetWorkStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkStatusQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetWorkStatusQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetWorkStatusQuery,
    GetWorkStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkStatusQuery, GetWorkStatusQueryVariables>(
    GetWorkStatusDocument,
    options
  )
}
export function useGetWorkStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorkStatusQuery,
    GetWorkStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkStatusQuery, GetWorkStatusQueryVariables>(
    GetWorkStatusDocument,
    options
  )
}
export function useGetWorkStatusSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetWorkStatusQuery,
    GetWorkStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetWorkStatusQuery,
    GetWorkStatusQueryVariables
  >(GetWorkStatusDocument, options)
}
export type GetWorkStatusQueryHookResult = ReturnType<
  typeof useGetWorkStatusQuery
>
export type GetWorkStatusLazyQueryHookResult = ReturnType<
  typeof useGetWorkStatusLazyQuery
>
export type GetWorkStatusSuspenseQueryHookResult = ReturnType<
  typeof useGetWorkStatusSuspenseQuery
>
export type GetWorkStatusQueryResult = Apollo.QueryResult<
  GetWorkStatusQuery,
  GetWorkStatusQueryVariables
>
export const GetMeDocument = gql`
  query getMe {
    me {
      id
      status
      email
      name {
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options
  )
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options
  )
}
export function useGetMeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options
  )
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>
export type GetMeSuspenseQueryHookResult = ReturnType<
  typeof useGetMeSuspenseQuery
>
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>
