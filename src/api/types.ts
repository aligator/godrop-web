import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Int64: number;
  Upload: File;
};

export type CreateFileNode = {
  name: Scalars['String'];
  path: Scalars['String'];
  description: Scalars['String'];
  isFolder: Scalars['Boolean'];
  mimeType?: Maybe<Scalars['String']>;
};

export type FileNode = {
  __typename?: 'FileNode';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  isFolder: Scalars['Boolean'];
  mimeType?: Maybe<Scalars['String']>;
  size: Scalars['Int64'];
  children?: Maybe<Array<FileNode>>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createFileNode: FileNode;
};


export type MutationCreateFileNodeArgs = {
  meta: CreateFileNode;
  file?: Maybe<Scalars['Upload']>;
};

export type Query = {
  __typename?: 'Query';
  getFileNode: FileNode;
};


export type QueryGetFileNodeArgs = {
  path: Scalars['String'];
};


export type CreateFileNodeMutationVariables = Exact<{
  meta: CreateFileNode;
  file?: Maybe<Scalars['Upload']>;
}>;


export type CreateFileNodeMutation = { __typename?: 'Mutation', createFileNode: { __typename?: 'FileNode', id: string, name: string, description: string, isFolder: boolean, mimeType?: Maybe<string>, size: number } };

export type FileNodeFragment = { __typename?: 'FileNode', id: string, name: string, description: string, isFolder: boolean, mimeType?: Maybe<string>, size: number };

export type FileNodeWithChildrenFragment = { __typename?: 'FileNode', id: string, name: string, description: string, isFolder: boolean, mimeType?: Maybe<string>, size: number, children?: Maybe<Array<{ __typename?: 'FileNode', id: string, name: string, description: string, isFolder: boolean, mimeType?: Maybe<string>, size: number }>> };

export type GetFileNodeQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type GetFileNodeQuery = { __typename?: 'Query', getFileNode: { __typename?: 'FileNode', id: string, name: string, description: string, isFolder: boolean, mimeType?: Maybe<string>, size: number, children?: Maybe<Array<{ __typename?: 'FileNode', id: string, name: string, description: string, isFolder: boolean, mimeType?: Maybe<string>, size: number }>> } };

export const FileNodeFragmentDoc = gql`
    fragment FileNode on FileNode {
  id
  name
  description
  isFolder
  mimeType
  size
}
    `;
export const FileNodeWithChildrenFragmentDoc = gql`
    fragment FileNodeWithChildren on FileNode {
  ...FileNode
  children {
    ...FileNode
  }
}
    ${FileNodeFragmentDoc}`;
export const CreateFileNodeDocument = gql`
    mutation CreateFileNode($meta: CreateFileNode!, $file: Upload) {
  createFileNode(meta: $meta, file: $file) {
    ...FileNode
  }
}
    ${FileNodeFragmentDoc}`;
export type CreateFileNodeMutationFn = Apollo.MutationFunction<CreateFileNodeMutation, CreateFileNodeMutationVariables>;

/**
 * __useCreateFileNodeMutation__
 *
 * To run a mutation, you first call `useCreateFileNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileNodeMutation, { data, loading, error }] = useCreateFileNodeMutation({
 *   variables: {
 *      meta: // value for 'meta'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useCreateFileNodeMutation(baseOptions?: Apollo.MutationHookOptions<CreateFileNodeMutation, CreateFileNodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFileNodeMutation, CreateFileNodeMutationVariables>(CreateFileNodeDocument, options);
      }
export type CreateFileNodeMutationHookResult = ReturnType<typeof useCreateFileNodeMutation>;
export type CreateFileNodeMutationResult = Apollo.MutationResult<CreateFileNodeMutation>;
export type CreateFileNodeMutationOptions = Apollo.BaseMutationOptions<CreateFileNodeMutation, CreateFileNodeMutationVariables>;
export const GetFileNodeDocument = gql`
    query GetFileNode($path: String!) {
  getFileNode(path: $path) {
    ...FileNodeWithChildren
  }
}
    ${FileNodeWithChildrenFragmentDoc}`;

/**
 * __useGetFileNodeQuery__
 *
 * To run a query within a React component, call `useGetFileNodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileNodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFileNodeQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetFileNodeQuery(baseOptions: Apollo.QueryHookOptions<GetFileNodeQuery, GetFileNodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFileNodeQuery, GetFileNodeQueryVariables>(GetFileNodeDocument, options);
      }
export function useGetFileNodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFileNodeQuery, GetFileNodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFileNodeQuery, GetFileNodeQueryVariables>(GetFileNodeDocument, options);
        }
export type GetFileNodeQueryHookResult = ReturnType<typeof useGetFileNodeQuery>;
export type GetFileNodeLazyQueryHookResult = ReturnType<typeof useGetFileNodeLazyQuery>;
export type GetFileNodeQueryResult = Apollo.QueryResult<GetFileNodeQuery, GetFileNodeQueryVariables>;