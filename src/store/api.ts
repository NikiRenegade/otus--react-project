import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SignUpBody {
  email: string;
  password: string;
  commandId: string;
}

interface AuthResult {
  token: string;
  profile: any;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://19429ba06ff2.vps.myjino.ru/api/' }),
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResult, SignUpBody>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation } = api;
