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

export type DateWorkReportMap = {
  __typename?: 'DateWorkReportMap'
  key: Scalars['Int']['output']
  value: WorkReport
}

export type DesiredShift = {
  __typename?: 'DesiredShift'
  createdAt: Scalars['Time']['output']
  employment: Employment
  employmentId: Scalars['Uint']['output']
  id: Scalars['Uint']['output']
  since: Scalars['Time']['output']
  till: Scalars['Time']['output']
  updatedAt: Scalars['Time']['output']
}

export type Employment = {
  __typename?: 'Employment'
  companyId: Scalars['Uint']['output']
  createdAt: Scalars['Time']['output']
  id: Scalars['Uint']['output']
  kind: EmploymentKind
  status: EmploymentStatus
  updatedAt: Scalars['Time']['output']
  worker: Worker
  workerId: Scalars['Uint']['output']
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

export type MonthReport = {
  __typename?: 'MonthReport'
  employmentId: Scalars['Uint']['output']
  month: Scalars['Time']['output']
  workReports: DateWorkReportMap[]
}

export type MonthWorkReportMap = {
  __typename?: 'MonthWorkReportMap'
  key: Scalars['Int']['output']
  value: WorkReport
}

export type Mutation = {
  __typename?: 'Mutation'
  createDesiredShift: DesiredShift
  createShift: Shift
  deleteDesiredShift: DesiredShift
  deleteShift: Shift
  login?: Maybe<LoginResponse>
  logout: Scalars['Boolean']['output']
  pushStamp: Stamp
  updateDesiredShift: DesiredShift
  updateShift: Shift
}

export type MutationCreateDesiredShiftArgs = {
  companyId: Scalars['Uint']['input']
  since: Scalars['Time']['input']
  till: Scalars['Time']['input']
}

export type MutationCreateShiftArgs = {
  companyId: Scalars['Uint']['input']
  since: Scalars['Time']['input']
  till: Scalars['Time']['input']
  workerId: Scalars['Uint']['input']
}

export type MutationDeleteDesiredShiftArgs = {
  id: Scalars['Uint']['input']
}

export type MutationDeleteShiftArgs = {
  id: Scalars['Uint']['input']
}

export type MutationLoginArgs = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationPushStampArgs = {
  companyId: Scalars['Uint']['input']
}

export type MutationUpdateDesiredShiftArgs = {
  id: Scalars['Uint']['input']
  since: Scalars['Time']['input']
  till: Scalars['Time']['input']
}

export type MutationUpdateShiftArgs = {
  id: Scalars['Uint']['input']
  since: Scalars['Time']['input']
  till: Scalars['Time']['input']
  workerId: Scalars['Uint']['input']
}

export type Query = {
  __typename?: 'Query'
  companies: Company[]
  company: Company
  companyDesiredShifts: DesiredShift[]
  companyShifts: Shift[]
  companyWorkers: Worker[]
  desiredShifts: DesiredShift[]
  me?: Maybe<Worker>
  monthReport: MonthReport
  workStatus: WorkStatus
  yearReport: YearReport
}

export type QueryCompanyArgs = {
  id: Scalars['Uint']['input']
}

export type QueryCompanyDesiredShiftsArgs = {
  companyId: Scalars['Uint']['input']
  fromTime?: InputMaybe<Scalars['Time']['input']>
  toTime?: InputMaybe<Scalars['Time']['input']>
}

export type QueryCompanyShiftsArgs = {
  companyId: Scalars['Uint']['input']
  fromTime?: InputMaybe<Scalars['Time']['input']>
  toTime?: InputMaybe<Scalars['Time']['input']>
}

export type QueryCompanyWorkersArgs = {
  companyId: Scalars['Uint']['input']
}

export type QueryDesiredShiftsArgs = {
  companyId: Scalars['Uint']['input']
  fromTime?: InputMaybe<Scalars['Time']['input']>
  toTime?: InputMaybe<Scalars['Time']['input']>
}

export type QueryMonthReportArgs = {
  companyId: Scalars['Uint']['input']
  month: Scalars['Time']['input']
}

export type QueryWorkStatusArgs = {
  companyId: Scalars['Uint']['input']
}

export type QueryYearReportArgs = {
  companyId: Scalars['Uint']['input']
  year: Scalars['Time']['input']
}

export type Shift = {
  __typename?: 'Shift'
  createdAt: Scalars['Time']['output']
  employment: Employment
  employmentId: Scalars['Uint']['output']
  id: Scalars['Uint']['output']
  since: Scalars['Time']['output']
  till: Scalars['Time']['output']
  updatedAt: Scalars['Time']['output']
}

export type Stamp = {
  __typename?: 'Stamp'
  createdAt: Scalars['Time']['output']
  employmentID: Scalars['Uint']['output']
  id: Scalars['Uint']['output']
  stampedAt: Scalars['Time']['output']
  updatedAt: Scalars['Time']['output']
}

export type WorkReport = {
  __typename?: 'WorkReport'
  stamps: Stamp[]
  workTime: Scalars['Int']['output']
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

export type YearReport = {
  __typename?: 'YearReport'
  employmentId: Scalars['Uint']['output']
  workReports: MonthWorkReportMap[]
  year: Scalars['Time']['output']
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
    employment: { __typename?: 'Employment'; kind: EmploymentKind }
  }
}

export type GetCompaniesQueryVariables = Exact<Record<string, never>>

export type GetCompaniesQuery = {
  __typename?: 'Query'
  companies: Array<{ __typename?: 'Company'; id: number; name: string }>
}

export type GetDesiredShiftsQueryVariables = Exact<{
  companyId: Scalars['Uint']['input']
  fromTime: Scalars['Time']['input']
  toTime: Scalars['Time']['input']
}>

export type GetDesiredShiftsQuery = {
  __typename?: 'Query'
  desiredShifts: Array<{
    __typename?: 'DesiredShift'
    id: number
    since: string
    till: string
  }>
}

export type GetCompanyDesiredShiftsQueryVariables = Exact<{
  companyId: Scalars['Uint']['input']
  fromTime: Scalars['Time']['input']
  toTime: Scalars['Time']['input']
}>

export type GetCompanyDesiredShiftsQuery = {
  __typename?: 'Query'
  companyDesiredShifts: Array<{
    __typename?: 'DesiredShift'
    id: number
    since: string
    till: string
    employment: {
      __typename?: 'Employment'
      worker: {
        __typename?: 'Worker'
        id: number
        name: { __typename?: 'WorkerName'; firstName: string; lastName: string }
      }
    }
  }>
}

export type CreateDesiredShiftMutationVariables = Exact<{
  companyId: Scalars['Uint']['input']
  since: Scalars['Time']['input']
  till: Scalars['Time']['input']
}>

export type CreateDesiredShiftMutation = {
  __typename?: 'Mutation'
  createDesiredShift: { __typename?: 'DesiredShift'; id: number }
}

export type UpdateDesiredShiftMutationVariables = Exact<{
  id: Scalars['Uint']['input']
  since: Scalars['Time']['input']
  till: Scalars['Time']['input']
}>

export type UpdateDesiredShiftMutation = {
  __typename?: 'Mutation'
  updateDesiredShift: { __typename?: 'DesiredShift'; id: number }
}

export type DeleteDesiredShiftMutationVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type DeleteDesiredShiftMutation = {
  __typename?: 'Mutation'
  deleteDesiredShift: { __typename?: 'DesiredShift'; id: number }
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'LoginResponse'
    worker?: { __typename?: 'Worker'; id: number } | null
  } | null
}

export type LogoutMutationVariables = Exact<Record<string, never>>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type GetCompanyShiftsQueryVariables = Exact<{
  companyId: Scalars['Uint']['input']
  fromTime: Scalars['Time']['input']
  toTime: Scalars['Time']['input']
}>

export type GetCompanyShiftsQuery = {
  __typename?: 'Query'
  companyShifts: Array<{
    __typename?: 'Shift'
    id: number
    since: string
    till: string
    employment: {
      __typename?: 'Employment'
      worker: {
        __typename?: 'Worker'
        id: number
        name: { __typename?: 'WorkerName'; firstName: string; lastName: string }
      }
    }
  }>
}

export type CreateShiftMutationVariables = Exact<{
  since: Scalars['Time']['input']
  till: Scalars['Time']['input']
  workerId: Scalars['Uint']['input']
  companyId: Scalars['Uint']['input']
}>

export type CreateShiftMutation = {
  __typename?: 'Mutation'
  createShift: { __typename?: 'Shift'; id: number }
}

export type UpdateShiftMutationVariables = Exact<{
  id: Scalars['Uint']['input']
  since: Scalars['Time']['input']
  till: Scalars['Time']['input']
  workerId: Scalars['Uint']['input']
}>

export type UpdateShiftMutation = {
  __typename?: 'Mutation'
  updateShift: { __typename?: 'Shift'; id: number }
}

export type DeleteShiftMutationVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type DeleteShiftMutation = {
  __typename?: 'Mutation'
  deleteShift: { __typename?: 'Shift'; id: number }
}

export type PushStampMutationVariables = Exact<{
  companyId: Scalars['Uint']['input']
}>

export type PushStampMutation = {
  __typename?: 'Mutation'
  pushStamp: { __typename?: 'Stamp'; id: number }
}

export type GetYearReportQueryVariables = Exact<{
  companyId: Scalars['Uint']['input']
  year: Scalars['Time']['input']
}>

export type GetYearReportQuery = {
  __typename?: 'Query'
  yearReport: {
    __typename?: 'YearReport'
    employmentId: number
    year: string
    workReports: Array<{
      __typename?: 'MonthWorkReportMap'
      key: number
      value: { __typename?: 'WorkReport'; workTime: number }
    }>
  }
}

export type GetMonthReportQueryVariables = Exact<{
  companyId: Scalars['Uint']['input']
  month: Scalars['Time']['input']
}>

export type GetMonthReportQuery = {
  __typename?: 'Query'
  monthReport: {
    __typename?: 'MonthReport'
    employmentId: number
    month: string
    workReports: Array<{
      __typename?: 'DateWorkReportMap'
      key: number
      value: { __typename?: 'WorkReport'; workTime: number }
    }>
  }
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
  me?: { __typename?: 'Worker'; id: number } | null
}

export type GetCompanyWorkersQueryVariables = Exact<{
  companyId: Scalars['Uint']['input']
}>

export type GetCompanyWorkersQuery = {
  __typename?: 'Query'
  companyWorkers: Array<{
    __typename?: 'Worker'
    id: number
    name: { __typename?: 'WorkerName'; firstName: string; lastName: string }
  }>
}

export const GetCompanyDocument = gql`
  query getCompany($id: Uint!) {
    company(id: $id) {
      id
      name
      employment {
        kind
      }
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
  query getDesiredShifts($companyId: Uint!, $fromTime: Time!, $toTime: Time!) {
    desiredShifts(companyId: $companyId, fromTime: $fromTime, toTime: $toTime) {
      id
      since
      till
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
 *      fromTime: // value for 'fromTime'
 *      toTime: // value for 'toTime'
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
export const GetCompanyDesiredShiftsDocument = gql`
  query getCompanyDesiredShifts(
    $companyId: Uint!
    $fromTime: Time!
    $toTime: Time!
  ) {
    companyDesiredShifts(
      companyId: $companyId
      fromTime: $fromTime
      toTime: $toTime
    ) {
      id
      since
      till
      employment {
        worker {
          id
          name {
            firstName
            lastName
          }
        }
      }
    }
  }
`

/**
 * __useGetCompanyDesiredShiftsQuery__
 *
 * To run a query within a React component, call `useGetCompanyDesiredShiftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyDesiredShiftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyDesiredShiftsQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      fromTime: // value for 'fromTime'
 *      toTime: // value for 'toTime'
 *   },
 * });
 */
export function useGetCompanyDesiredShiftsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCompanyDesiredShiftsQuery,
    GetCompanyDesiredShiftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetCompanyDesiredShiftsQuery,
    GetCompanyDesiredShiftsQueryVariables
  >(GetCompanyDesiredShiftsDocument, options)
}
export function useGetCompanyDesiredShiftsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompanyDesiredShiftsQuery,
    GetCompanyDesiredShiftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetCompanyDesiredShiftsQuery,
    GetCompanyDesiredShiftsQueryVariables
  >(GetCompanyDesiredShiftsDocument, options)
}
export function useGetCompanyDesiredShiftsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetCompanyDesiredShiftsQuery,
    GetCompanyDesiredShiftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetCompanyDesiredShiftsQuery,
    GetCompanyDesiredShiftsQueryVariables
  >(GetCompanyDesiredShiftsDocument, options)
}
export type GetCompanyDesiredShiftsQueryHookResult = ReturnType<
  typeof useGetCompanyDesiredShiftsQuery
>
export type GetCompanyDesiredShiftsLazyQueryHookResult = ReturnType<
  typeof useGetCompanyDesiredShiftsLazyQuery
>
export type GetCompanyDesiredShiftsSuspenseQueryHookResult = ReturnType<
  typeof useGetCompanyDesiredShiftsSuspenseQuery
>
export type GetCompanyDesiredShiftsQueryResult = Apollo.QueryResult<
  GetCompanyDesiredShiftsQuery,
  GetCompanyDesiredShiftsQueryVariables
>
export const CreateDesiredShiftDocument = gql`
  mutation createDesiredShift($companyId: Uint!, $since: Time!, $till: Time!) {
    createDesiredShift(companyId: $companyId, since: $since, till: $till) {
      id
    }
  }
`
export type CreateDesiredShiftMutationFn = Apollo.MutationFunction<
  CreateDesiredShiftMutation,
  CreateDesiredShiftMutationVariables
>

/**
 * __useCreateDesiredShiftMutation__
 *
 * To run a mutation, you first call `useCreateDesiredShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDesiredShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDesiredShiftMutation, { data, loading, error }] = useCreateDesiredShiftMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      since: // value for 'since'
 *      till: // value for 'till'
 *   },
 * });
 */
export function useCreateDesiredShiftMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDesiredShiftMutation,
    CreateDesiredShiftMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateDesiredShiftMutation,
    CreateDesiredShiftMutationVariables
  >(CreateDesiredShiftDocument, options)
}
export type CreateDesiredShiftMutationHookResult = ReturnType<
  typeof useCreateDesiredShiftMutation
>
export type CreateDesiredShiftMutationResult =
  Apollo.MutationResult<CreateDesiredShiftMutation>
export type CreateDesiredShiftMutationOptions = Apollo.BaseMutationOptions<
  CreateDesiredShiftMutation,
  CreateDesiredShiftMutationVariables
>
export const UpdateDesiredShiftDocument = gql`
  mutation updateDesiredShift($id: Uint!, $since: Time!, $till: Time!) {
    updateDesiredShift(id: $id, since: $since, till: $till) {
      id
    }
  }
`
export type UpdateDesiredShiftMutationFn = Apollo.MutationFunction<
  UpdateDesiredShiftMutation,
  UpdateDesiredShiftMutationVariables
>

/**
 * __useUpdateDesiredShiftMutation__
 *
 * To run a mutation, you first call `useUpdateDesiredShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDesiredShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDesiredShiftMutation, { data, loading, error }] = useUpdateDesiredShiftMutation({
 *   variables: {
 *      id: // value for 'id'
 *      since: // value for 'since'
 *      till: // value for 'till'
 *   },
 * });
 */
export function useUpdateDesiredShiftMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDesiredShiftMutation,
    UpdateDesiredShiftMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateDesiredShiftMutation,
    UpdateDesiredShiftMutationVariables
  >(UpdateDesiredShiftDocument, options)
}
export type UpdateDesiredShiftMutationHookResult = ReturnType<
  typeof useUpdateDesiredShiftMutation
>
export type UpdateDesiredShiftMutationResult =
  Apollo.MutationResult<UpdateDesiredShiftMutation>
export type UpdateDesiredShiftMutationOptions = Apollo.BaseMutationOptions<
  UpdateDesiredShiftMutation,
  UpdateDesiredShiftMutationVariables
>
export const DeleteDesiredShiftDocument = gql`
  mutation deleteDesiredShift($id: Uint!) {
    deleteDesiredShift(id: $id) {
      id
    }
  }
`
export type DeleteDesiredShiftMutationFn = Apollo.MutationFunction<
  DeleteDesiredShiftMutation,
  DeleteDesiredShiftMutationVariables
>

/**
 * __useDeleteDesiredShiftMutation__
 *
 * To run a mutation, you first call `useDeleteDesiredShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDesiredShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDesiredShiftMutation, { data, loading, error }] = useDeleteDesiredShiftMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDesiredShiftMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteDesiredShiftMutation,
    DeleteDesiredShiftMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteDesiredShiftMutation,
    DeleteDesiredShiftMutationVariables
  >(DeleteDesiredShiftDocument, options)
}
export type DeleteDesiredShiftMutationHookResult = ReturnType<
  typeof useDeleteDesiredShiftMutation
>
export type DeleteDesiredShiftMutationResult =
  Apollo.MutationResult<DeleteDesiredShiftMutation>
export type DeleteDesiredShiftMutationOptions = Apollo.BaseMutationOptions<
  DeleteDesiredShiftMutation,
  DeleteDesiredShiftMutationVariables
>
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      worker {
        id
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
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const GetCompanyShiftsDocument = gql`
  query getCompanyShifts($companyId: Uint!, $fromTime: Time!, $toTime: Time!) {
    companyShifts(companyId: $companyId, fromTime: $fromTime, toTime: $toTime) {
      id
      since
      till
      employment {
        worker {
          id
          name {
            firstName
            lastName
          }
        }
      }
    }
  }
`

/**
 * __useGetCompanyShiftsQuery__
 *
 * To run a query within a React component, call `useGetCompanyShiftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyShiftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyShiftsQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      fromTime: // value for 'fromTime'
 *      toTime: // value for 'toTime'
 *   },
 * });
 */
export function useGetCompanyShiftsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCompanyShiftsQuery,
    GetCompanyShiftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCompanyShiftsQuery, GetCompanyShiftsQueryVariables>(
    GetCompanyShiftsDocument,
    options
  )
}
export function useGetCompanyShiftsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompanyShiftsQuery,
    GetCompanyShiftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetCompanyShiftsQuery,
    GetCompanyShiftsQueryVariables
  >(GetCompanyShiftsDocument, options)
}
export function useGetCompanyShiftsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetCompanyShiftsQuery,
    GetCompanyShiftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetCompanyShiftsQuery,
    GetCompanyShiftsQueryVariables
  >(GetCompanyShiftsDocument, options)
}
export type GetCompanyShiftsQueryHookResult = ReturnType<
  typeof useGetCompanyShiftsQuery
>
export type GetCompanyShiftsLazyQueryHookResult = ReturnType<
  typeof useGetCompanyShiftsLazyQuery
>
export type GetCompanyShiftsSuspenseQueryHookResult = ReturnType<
  typeof useGetCompanyShiftsSuspenseQuery
>
export type GetCompanyShiftsQueryResult = Apollo.QueryResult<
  GetCompanyShiftsQuery,
  GetCompanyShiftsQueryVariables
>
export const CreateShiftDocument = gql`
  mutation createShift(
    $since: Time!
    $till: Time!
    $workerId: Uint!
    $companyId: Uint!
  ) {
    createShift(
      since: $since
      till: $till
      workerId: $workerId
      companyId: $companyId
    ) {
      id
    }
  }
`
export type CreateShiftMutationFn = Apollo.MutationFunction<
  CreateShiftMutation,
  CreateShiftMutationVariables
>

/**
 * __useCreateShiftMutation__
 *
 * To run a mutation, you first call `useCreateShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShiftMutation, { data, loading, error }] = useCreateShiftMutation({
 *   variables: {
 *      since: // value for 'since'
 *      till: // value for 'till'
 *      workerId: // value for 'workerId'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useCreateShiftMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateShiftMutation,
    CreateShiftMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateShiftMutation, CreateShiftMutationVariables>(
    CreateShiftDocument,
    options
  )
}
export type CreateShiftMutationHookResult = ReturnType<
  typeof useCreateShiftMutation
>
export type CreateShiftMutationResult =
  Apollo.MutationResult<CreateShiftMutation>
export type CreateShiftMutationOptions = Apollo.BaseMutationOptions<
  CreateShiftMutation,
  CreateShiftMutationVariables
>
export const UpdateShiftDocument = gql`
  mutation updateShift(
    $id: Uint!
    $since: Time!
    $till: Time!
    $workerId: Uint!
  ) {
    updateShift(id: $id, since: $since, till: $till, workerId: $workerId) {
      id
    }
  }
`
export type UpdateShiftMutationFn = Apollo.MutationFunction<
  UpdateShiftMutation,
  UpdateShiftMutationVariables
>

/**
 * __useUpdateShiftMutation__
 *
 * To run a mutation, you first call `useUpdateShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShiftMutation, { data, loading, error }] = useUpdateShiftMutation({
 *   variables: {
 *      id: // value for 'id'
 *      since: // value for 'since'
 *      till: // value for 'till'
 *      workerId: // value for 'workerId'
 *   },
 * });
 */
export function useUpdateShiftMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateShiftMutation,
    UpdateShiftMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateShiftMutation, UpdateShiftMutationVariables>(
    UpdateShiftDocument,
    options
  )
}
export type UpdateShiftMutationHookResult = ReturnType<
  typeof useUpdateShiftMutation
>
export type UpdateShiftMutationResult =
  Apollo.MutationResult<UpdateShiftMutation>
export type UpdateShiftMutationOptions = Apollo.BaseMutationOptions<
  UpdateShiftMutation,
  UpdateShiftMutationVariables
>
export const DeleteShiftDocument = gql`
  mutation deleteShift($id: Uint!) {
    deleteShift(id: $id) {
      id
    }
  }
`
export type DeleteShiftMutationFn = Apollo.MutationFunction<
  DeleteShiftMutation,
  DeleteShiftMutationVariables
>

/**
 * __useDeleteShiftMutation__
 *
 * To run a mutation, you first call `useDeleteShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShiftMutation, { data, loading, error }] = useDeleteShiftMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShiftMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteShiftMutation,
    DeleteShiftMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteShiftMutation, DeleteShiftMutationVariables>(
    DeleteShiftDocument,
    options
  )
}
export type DeleteShiftMutationHookResult = ReturnType<
  typeof useDeleteShiftMutation
>
export type DeleteShiftMutationResult =
  Apollo.MutationResult<DeleteShiftMutation>
export type DeleteShiftMutationOptions = Apollo.BaseMutationOptions<
  DeleteShiftMutation,
  DeleteShiftMutationVariables
>
export const PushStampDocument = gql`
  mutation pushStamp($companyId: Uint!) {
    pushStamp(companyId: $companyId) {
      id
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
export const GetYearReportDocument = gql`
  query getYearReport($companyId: Uint!, $year: Time!) {
    yearReport(companyId: $companyId, year: $year) {
      employmentId
      year
      workReports {
        key
        value {
          workTime
        }
      }
    }
  }
`

/**
 * __useGetYearReportQuery__
 *
 * To run a query within a React component, call `useGetYearReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetYearReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetYearReportQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetYearReportQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetYearReportQuery,
    GetYearReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetYearReportQuery, GetYearReportQueryVariables>(
    GetYearReportDocument,
    options
  )
}
export function useGetYearReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetYearReportQuery,
    GetYearReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetYearReportQuery, GetYearReportQueryVariables>(
    GetYearReportDocument,
    options
  )
}
export function useGetYearReportSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetYearReportQuery,
    GetYearReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetYearReportQuery,
    GetYearReportQueryVariables
  >(GetYearReportDocument, options)
}
export type GetYearReportQueryHookResult = ReturnType<
  typeof useGetYearReportQuery
>
export type GetYearReportLazyQueryHookResult = ReturnType<
  typeof useGetYearReportLazyQuery
>
export type GetYearReportSuspenseQueryHookResult = ReturnType<
  typeof useGetYearReportSuspenseQuery
>
export type GetYearReportQueryResult = Apollo.QueryResult<
  GetYearReportQuery,
  GetYearReportQueryVariables
>
export const GetMonthReportDocument = gql`
  query getMonthReport($companyId: Uint!, $month: Time!) {
    monthReport(companyId: $companyId, month: $month) {
      employmentId
      month
      workReports {
        key
        value {
          workTime
        }
      }
    }
  }
`

/**
 * __useGetMonthReportQuery__
 *
 * To run a query within a React component, call `useGetMonthReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMonthReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMonthReportQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useGetMonthReportQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMonthReportQuery,
    GetMonthReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMonthReportQuery, GetMonthReportQueryVariables>(
    GetMonthReportDocument,
    options
  )
}
export function useGetMonthReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMonthReportQuery,
    GetMonthReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMonthReportQuery, GetMonthReportQueryVariables>(
    GetMonthReportDocument,
    options
  )
}
export function useGetMonthReportSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMonthReportQuery,
    GetMonthReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetMonthReportQuery,
    GetMonthReportQueryVariables
  >(GetMonthReportDocument, options)
}
export type GetMonthReportQueryHookResult = ReturnType<
  typeof useGetMonthReportQuery
>
export type GetMonthReportLazyQueryHookResult = ReturnType<
  typeof useGetMonthReportLazyQuery
>
export type GetMonthReportSuspenseQueryHookResult = ReturnType<
  typeof useGetMonthReportSuspenseQuery
>
export type GetMonthReportQueryResult = Apollo.QueryResult<
  GetMonthReportQuery,
  GetMonthReportQueryVariables
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
export const GetCompanyWorkersDocument = gql`
  query getCompanyWorkers($companyId: Uint!) {
    companyWorkers(companyId: $companyId) {
      id
      name {
        firstName
        lastName
      }
    }
  }
`

/**
 * __useGetCompanyWorkersQuery__
 *
 * To run a query within a React component, call `useGetCompanyWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyWorkersQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetCompanyWorkersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCompanyWorkersQuery,
    GetCompanyWorkersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetCompanyWorkersQuery,
    GetCompanyWorkersQueryVariables
  >(GetCompanyWorkersDocument, options)
}
export function useGetCompanyWorkersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompanyWorkersQuery,
    GetCompanyWorkersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetCompanyWorkersQuery,
    GetCompanyWorkersQueryVariables
  >(GetCompanyWorkersDocument, options)
}
export function useGetCompanyWorkersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetCompanyWorkersQuery,
    GetCompanyWorkersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetCompanyWorkersQuery,
    GetCompanyWorkersQueryVariables
  >(GetCompanyWorkersDocument, options)
}
export type GetCompanyWorkersQueryHookResult = ReturnType<
  typeof useGetCompanyWorkersQuery
>
export type GetCompanyWorkersLazyQueryHookResult = ReturnType<
  typeof useGetCompanyWorkersLazyQuery
>
export type GetCompanyWorkersSuspenseQueryHookResult = ReturnType<
  typeof useGetCompanyWorkersSuspenseQuery
>
export type GetCompanyWorkersQueryResult = Apollo.QueryResult<
  GetCompanyWorkersQuery,
  GetCompanyWorkersQueryVariables
>
