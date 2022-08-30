import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH } from 'api'
import { AuthorizedUserDataType, PayloadType } from 'api/auth/types'
import { AxiosError } from 'axios'
import { RootStateType } from 'store'
import { handleServerNetworkError } from 'utils'

export const registration = createAsyncThunk
	<
		void,
		{ email: string, password: string },
		{ rejectValue: { error: string } }
	>
	('auth/registration', async (params, { rejectWithValue }) => {
		try {
			const response = await AUTH.register(params.email, params.password)

		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
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
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
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
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
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

		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
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

		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
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

		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
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
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})
