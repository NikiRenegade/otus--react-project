import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Operation } from '../entities/Operation';
import { Category } from '../entities/Category';
import { User } from 'src/entities/User';
interface SignUpBody {
  email: string;
  password: string;
  commandId: string;
}
interface SignInBody {
  email: string;
  password: string;
}

interface AuthResult {
  token: string;
}

export interface GetOperationsResponse {
  data: Operation[];
  total: number;
}
interface ChangeOperationRequest {
  name: string;
  desc?: string;
  amount: number;
  categoryId: string;
  type: 'Profit' | 'Cost';
  date: string;
}

export interface GetCategoriesResponse {
  data: Category[];
  total: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://19429ba06ff2.vps.myjino.ru/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Operations', 'Categories'],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResult, SignUpBody>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    signin: builder.mutation<AuthResult, SignInBody>({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => ({
        url: 'profile',
        method: 'GET',
      }),
    }),
    changePassword: builder.mutation<any, { password: string; newPassword: string }>({
      query: (body) => ({
        url: 'profile/change-password',
        method: 'POST',
        body,
      }),
    }),
    createCategory: builder.mutation<void, string>({
      query: (body) => ({
        url: 'categories',
        method: 'POST',
        body,
      }),
    }),
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => ({
        url: 'categories',
        method: 'GET',
      }),
    }),
    getOperations: builder.query<GetOperationsResponse, void>({
      query: () => ({
        url: 'operations',
        method: 'GET',
      }),
      providesTags: ['Operations'],
    }),
    getOperation: builder.query<Operation, string>({
      query: (id) => ({
        url: `operations/${id}`,
        method: 'GET',
      }),
    }),
    createOperation: builder.mutation<Operation, ChangeOperationRequest>({
      query: (body) => ({
        url: 'operations',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Operations'],
    }),
    updateOperation: builder.mutation<Operation, { id: string; body: ChangeOperationRequest }>({
      query: ({ id, body }) => ({
        url: `operations/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Operations'],
    }),
    deleteOperation: builder.mutation<void, string>({
      query: (id) => ({
        url: `operations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Operations'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useSignupMutation,
  useSigninMutation,
  useChangePasswordMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetOperationsQuery,
  useGetOperationQuery,
  useCreateOperationMutation,
  useUpdateOperationMutation,
  useDeleteOperationMutation,
} = api;
