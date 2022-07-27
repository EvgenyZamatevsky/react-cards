import { createAsyncThunk } from '@reduxjs/toolkit'
import { PACKS } from 'api/packs'
import { PackType } from 'api/packs/types'

export const getPacks = createAsyncThunk
	<{ packs: PackType[], minCardsCount: number, maxCardsCount: number },
		{ packName: string, sortPacks: string, min: number, max: number },
		{ rejectValue: { error: string } }>
	('packs/getPacks', async (params, { rejectWithValue }) => {
		try {
			const response = await PACKS.getPacks(params.packName, params.sortPacks, params.min, params.max)
			const { cardPacks: packs, minCardsCount, maxCardsCount } = response.data

			return { packs, minCardsCount, maxCardsCount }
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
