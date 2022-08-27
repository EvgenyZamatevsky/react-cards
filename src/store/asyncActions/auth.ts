import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH } from 'api'
import { AuthorizedUserDataType, PayloadType } from 'api/auth/types'
import axios, { AxiosError } from 'axios'
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

		} catch (e) {
			const err = e as Error | AxiosError

			if (axios.isAxiosError(err)) {
				const error = err.response?.data
					? (err.response.data as { error: string }).error
					: err.message
				return rejectWithValue({ error })
			} else {
				return rejectWithValue({ error: err.message })
			}
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
		} catch (e) {
			const err = e as Error | AxiosError

			if (axios.isAxiosError(err)) {
				const error = err.response?.data
					? (err.response.data as { error: string }).error
					: err.message
				return rejectWithValue({ error })
			} else {
				return rejectWithValue({ error: err.message })
			}
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
		} catch (e) {
			const err = e as Error | AxiosError

			if (axios.isAxiosError(err)) {
				const error = err.response?.data
					? (err.response.data as { error: string }).error
					: err.message
				return rejectWithValue({ error })
			} else {
				return rejectWithValue({ error: err.message })
			}
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

		} catch (e) {
			const err = e as Error | AxiosError

			if (axios.isAxiosError(err)) {
				const error = err.response?.data
					? (err.response.data as { error: string }).error
					: err.message
				return rejectWithValue({ error })
			} else {
				return rejectWithValue({ error: err.message })
			}
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

		} catch (e) {
			const err = e as Error | AxiosError

			if (axios.isAxiosError(err)) {
				const error = err.response?.data
					? (err.response.data as { error: string }).error
					: err.message
				return rejectWithValue({ error })
			} else {
				return rejectWithValue({ error: err.message })
			}
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

		} catch (e) {
			const err = e as Error | AxiosError

			if (axios.isAxiosError(err)) {
				const error = err.response?.data
					? (err.response.data as { error: string }).error
					: err.message
				return rejectWithValue({ error })
			} else {
				return rejectWithValue({ error: err.message })
			}
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

		} catch (e) {
			const err = e as Error | AxiosError

			if (axios.isAxiosError(err)) {
				const error = err.response?.data
					? (err.response.data as { error: string }).error
					: err.message
				return rejectWithValue({ error })
			} else {
				return rejectWithValue({ error: err.message })
			}
		}
	})
