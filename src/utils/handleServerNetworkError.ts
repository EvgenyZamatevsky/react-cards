import axios, { AxiosError } from 'axios'

export const handleServerNetworkError =
	(e: Error | AxiosError<{ error: string }>, rejectWithValue: (value: { error: string }) => any) => {

		const err = e as Error | AxiosError<{ error: string }>

		if (axios.isAxiosError(err)) {
			const error = err.response?.data ? err.response.data.error : 'Some error occurred'
			return rejectWithValue({ error })
		} else {
			return rejectWithValue({ error: err.message })
		}
	}
