import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCards } from 'store/asyncActions/cards'
import { CardsSliceInitialStateType } from './types'

const initialState: CardsSliceInitialStateType = {
	cards: []
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			// state.searchValue = action.payload
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getCards.fulfilled, (state, action) => {
				state.cards = action.payload.cards
			})
	},
})

export const { } = cardsSlice.actions

export default cardsSlice.reducer
