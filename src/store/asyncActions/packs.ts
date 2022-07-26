import { createAsyncThunk } from '@reduxjs/toolkit'
import { PACKS } from 'api/packs'

export const getPacks = createAsyncThunk
	<void, undefined, { rejectValue: { error: string } }>
	('packs/getPacks', async (_, { rejectWithValue }) => {
		try {
			const response = await PACKS.getPacks()
			console.log(response.data)
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
