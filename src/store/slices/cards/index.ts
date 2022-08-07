import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { getCards } from 'store/asyncActions/cards'
import { CardsSliceInitialStateType } from './types'

const initialState: CardsSliceInitialStateType = {
	cards: [],
	searchCardValue: EMPTY_STRING,
	sortCards: EMPTY_STRING,
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		setSearchCardValue(state, action: PayloadAction<string>) {
			state.searchCardValue = action.payload
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

export const { setSearchCardValue, setSortCards } = cardsSlice.actions

export default cardsSlice.reducer
