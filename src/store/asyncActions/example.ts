import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH } from 'api'
import { RootStateType } from 'store'

export const asyncAction = createAsyncThunk
	<void, undefined, { rejectValue: { errors: string[] }, state: RootStateType }>
	('app/asyncAction', async (_, { rejectWithValue, getState, dispatch }) => {

		const state = getState()

		try {
			const response = await AUTH.login()
		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})
