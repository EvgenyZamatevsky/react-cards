import { createAsyncThunk } from '@reduxjs/toolkit'
import { PACKS } from 'api/packs'
import { PackType } from 'api/packs/types'

export const getPacks = createAsyncThunk
	<PackType[], { packName: string, sortPacks: string }, { rejectValue: { error: string } }>
	('packs/getPacks', async (params, { rejectWithValue }) => {
		try {
			const response = await PACKS.getPacks(params.packName, params.sortPacks)
			const { cardPacks: packs } = response.data

			return packs
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
