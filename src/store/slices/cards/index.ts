import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { getCards } from 'store/asyncActions/cards'
import { CardsSliceInitialStateType } from './types'

const initialState: CardsSliceInitialStateType = {
	cards: [],
	cardQuestion: EMPTY_STRING,
	sortCards: EMPTY_STRING,
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
		},
		setSortCards(state, action: PayloadAction<string>) {
			state.sortCards = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getCards.fulfilled, (state, action) => {
				state.cards = action.payload.cards
			})
	},
})

export const { setCardQuestion, resetCards, setSortCards } = cardsSlice.actions

export default cardsSlice.reducer
