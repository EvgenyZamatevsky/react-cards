import { createAsyncThunk } from '@reduxjs/toolkit'
import { PACKS } from 'api/packs'
import { PackType } from 'api/packs/types'

export const getPacks = createAsyncThunk
	<PackType[], undefined, { rejectValue: { error: string } }>
	('packs/getPacks', async (_, { rejectWithValue }) => {
		try {
			const response = await PACKS.getPacks()
			const { cardPacks: packs } = response.data

			return packs
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
