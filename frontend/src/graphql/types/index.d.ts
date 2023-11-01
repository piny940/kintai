import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
};

export type Company = {
  __typename?: 'Company';
  createdAt: Scalars['Time']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type DesiredShift = {
  __typename?: 'DesiredShift';
  createdAt: Scalars['Time']['output'];
  employmentId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  since: Scalars['String']['output'];
  till: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type Employment = {
  __typename?: 'Employment';
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['Time']['output'];
  id: Scalars['Int']['output'];
  kind: EmploymentKind;
  status: EmploymentStatus;
  updatedAt: Scalars['Time']['output'];
  workerId: Scalars['Int']['output'];
};

export enum EmploymentKind {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export enum EmploymentStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Worker>;
  logout: Scalars['Boolean']['output'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Worker>;
};

export enum WorkStatus {
  Left = 'LEFT',
  Working = 'WORKING'
}

export type Worker = {
  __typename?: 'Worker';
  createdAt: Scalars['Time']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: WorkerName;
  status: WorkerStatus;
  updatedAt: Scalars['Time']['output'];
};

export type WorkerName = {
  __typename?: 'WorkerName';
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export enum WorkerStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Worker', id: number, name: { __typename?: 'WorkerName', firstName: string, lastName: string } } | null };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    name {
      firstName
      lastName
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;