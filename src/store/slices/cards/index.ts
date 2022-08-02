import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { getCards } from 'store/asyncActions/cards'
import { CardsSliceInitialStateType } from './types'

const initialState: CardsSliceInitialStateType = {
	cards: [],
	cardQuestion: EMPTY_STRING
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		setCardQuestion(state, action: PayloadAction<string>) {
			state.cardQuestion = action.payload
		},
		resetCards(state) {
			state.cards = []
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getCards.fulfilled, (state, action) => {
				state.cards = action.payload.cards
			})
	},
})

export const { setCardQuestion, resetCards } = cardsSlice.actions

export default cardsSlice.reducer
