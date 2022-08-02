import { createAsyncThunk } from '@reduxjs/toolkit'
import { CARDS } from 'api'
import { CardType } from 'api/cards/types'

export const getCards = createAsyncThunk
	<{ cards: CardType[] },
		{ packId: string, cardQuestion: string },
		{ rejectValue: { error: string } }>
	('cards/getCards', async (params, { rejectWithValue }) => {
		try {
			const response = await CARDS.getCards(params.packId, params.cardQuestion)
			const { cards } = response.data

			return { cards }
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
