import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH } from 'api'
import { AuthorizedUserDataType } from 'api/auth/types'

export const registration = createAsyncThunk
	<void, { email: string, password: string }, { rejectValue: { error: string } }>
	('auth/registration', async (registrationParams, { rejectWithValue }) => {
		try {
			const response = await AUTH.register(registrationParams.email, registrationParams.password)
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const login = createAsyncThunk
	<void,
		{ email: string, password: string, rememberMe: boolean },
		{ rejectValue: { error: string } }>
	('auth/login', async (loginParams, { rejectWithValue, dispatch }) => {
		try {
			const response = await AUTH.login(loginParams)
			dispatch(getAuthorizedUserData())
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const getAuthorizedUserData = createAsyncThunk
	<AuthorizedUserDataType, undefined, { rejectValue: { error: string } }>
	('auth/getAuthorizedUserData', async (_, { rejectWithValue }) => {
		try {
			const response = await AUTH.me()
			const authorizedUserData = response.data

			return authorizedUserData
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const logOut = createAsyncThunk
	<void, undefined, { rejectValue: { error: string } }>
	('auth/logOut', async (_, { rejectWithValue }) => {
		try {
			const response = await AUTH.logOut()
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const forgotPassword = createAsyncThunk
	<void, string, { rejectValue: { error: string } }>
	('auth/forgotPassword', async (email, { rejectWithValue }) => {
		try {
			const response = await AUTH.forgot(email)
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})