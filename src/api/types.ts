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
};

export type CreateFileNode = {
  name: Scalars['String'];
  description: Scalars['String'];
  isFolder: Scalars['Boolean'];
  mimeType?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
};

export type FileNode = {
  __typename?: 'FileNode';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  isFolder: Scalars['Boolean'];
  mimeType?: Maybe<Scalars['String']>;
  children?: Maybe<Array<FileNode>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFileNode: FileNode;
};


export type MutationCreateFileNodeArgs = {
  input: CreateFileNode;
};

export type Query = {
  __typename?: 'Query';
  getFileNode: FileNode;
};


export type QueryGetFileNodeArgs = {
  path: Scalars['String'];
};

export type GetFileNodeQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type GetFileNodeQuery = { __typename?: 'Query', getFileNode: { __typename?: 'FileNode', id: string, name: string, description: string, isFolder: boolean, mimeType?: Maybe<string>, children?: Maybe<Array<{ __typename?: 'FileNode', id: string, name: string, description: string, isFolder: boolean, mimeType?: Maybe<string> }>> } };


export const GetFileNodeDocument = gql`
    query GetFileNode($path: String!) {
  getFileNode(path: $path) {
    id
    name
    description
    isFolder
    mimeType
    children {
      id
      name
      description
      isFolder
      mimeType
    }
  }
}
    `;

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