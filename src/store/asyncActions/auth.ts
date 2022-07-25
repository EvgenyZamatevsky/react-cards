import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH } from 'api'

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
