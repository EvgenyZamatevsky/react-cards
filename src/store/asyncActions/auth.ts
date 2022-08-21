import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH } from 'api'
import { AuthorizedUserDataType, PayloadType } from 'api/auth/types'
import { RootStateType } from 'store'

export const registration = createAsyncThunk
	<
		void,
		{ email: string, password: string },
		{ rejectValue: { error: string } }
	>
	('auth/registration', async (params, { rejectWithValue }) => {
		try {
			const response = await AUTH.register(params.email, params.password)

		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const login = createAsyncThunk
	<
		AuthorizedUserDataType,
		{ email: string, password: string, rememberMe: boolean },
		{ rejectValue: { error: string } }
	>
	('auth/login', async (params, { rejectWithValue }) => {
		try {
			const response = await AUTH.login(params.email, params.password, params.rememberMe)
			const authorizedUserData = response.data

			return authorizedUserData
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const getAuthorizedUserData = createAsyncThunk
	<
		AuthorizedUserDataType,
		undefined,
		{ rejectValue: { error: string } }
	>
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
	<
		void,
		undefined,
		{ rejectValue: { error: string } }
	>
	('auth/logOut', async (_, { rejectWithValue }) => {
		try {
			const response = await AUTH.logOut()

		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const forgot = createAsyncThunk
	<
		void,
		string,
		{ rejectValue: { error: string } }
	>
	('auth/forgot', async (email, { rejectWithValue }) => {
		try {
			const response = await AUTH.forgot(email)

		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const setNewPassword = createAsyncThunk
	<
		void,
		{ updatedPassword: string, resetPasswordToken: string },
		{ rejectValue: { error: string } }
	>
	('auth/setNewPassword', async (params, { rejectWithValue }) => {
		try {
			const response = await AUTH.setNewPassword(params.updatedPassword, params.resetPasswordToken)

		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const updateAuthorizedUserNameOrAvatar = createAsyncThunk
	<
		{ avatar: string, name: string },
		{ name?: string, avatar?: string },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('auth/updateAuthorizedUser', async (updatedPayload, { rejectWithValue, getState }) => {
		try {
			const authorizedUserData = getState().auth.authorizedUserData

			const payload: PayloadType = {
				name: authorizedUserData?.name as string,
				avatar: authorizedUserData?.avatar as string,
				...updatedPayload
			}

			const response = await AUTH.updateAuthorizedUserNameOrAvatar(payload)
			const { avatar, name } = response.data.updatedUser

			return { avatar, name }

		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
