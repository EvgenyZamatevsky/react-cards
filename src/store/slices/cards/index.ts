import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { getCards } from 'store/asyncActions/cards'
import { CardsSliceInitialStateType } from './types'

const initialState: CardsSliceInitialStateType = {
	cards: [],
	searchCardValue: EMPTY_STRING,
	sortCards: EMPTY_STRING,
	page: 1,
	pageCount: 10,
	cardsTotalCount: 0,
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
		},
		setCardPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
		setCardPageCount(state, action: PayloadAction<number>) {
			state.pageCount = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getCards.fulfilled, (state, action) => {
				state.cards = action.payload.cards
				state.cardsTotalCount = action.payload.cardsTotalCount
			})
	},
})

export const { setSearchCardValue, setSortCards, setCardPage, setCardPageCount } = cardsSlice.actions

export default cardsSlice.reducer
