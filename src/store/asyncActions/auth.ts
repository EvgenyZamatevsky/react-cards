import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH } from 'api'

export const register = createAsyncThunk
	<void, { email: string, password: string }, { rejectValue: { errors: string[] } }>
	('auth/register', async (registerParams, { rejectWithValue, getState, dispatch }) => {
		try {
			const response = await AUTH.register(registerParams.email, registerParams.password)
			console.log(response.data)

		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			console.log(error)

			return rejectWithValue({ errors: [e.message] })
		}
	})
