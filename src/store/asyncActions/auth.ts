import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH } from 'api'
import { AuthorizedUserDataType } from 'api/auth/types'
import { RootStateType } from 'store'

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
	('auth/getAuthorizedUserData', async (_, { rejectWithValue, dispatch }) => {
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

export const setNewPassword = createAsyncThunk
	<void, { password: string, resetPasswordToken: string }, { rejectValue: { error: string } }>
	('auth/setNewPassword', async (params, { rejectWithValue }) => {
		try {
			const response = await AUTH.setNewPassword(params.password, params.resetPasswordToken)
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const updateAuthorizedUser = createAsyncThunk
	<AuthorizedUserDataType,
		{ name?: string, avatar?: string },
		{ rejectValue: { error: string }, state: RootStateType }>
	('auth/updateAuthorizedUser', async (domainPayload, { rejectWithValue, getState, dispatch }) => {
		try {

			const authorizedUserData = getState().auth.authorizedUserData

			const payload = {
				name: authorizedUserData?.name as string,
				avatar: authorizedUserData?.avatar as string,
				...domainPayload
			}

			const response = await AUTH.updateAuthorizedUser(payload)
			const updatedAuthorizedUser = response.data.updatedUser

			return updatedAuthorizedUser

		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
