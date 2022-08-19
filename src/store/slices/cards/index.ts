import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { logOut } from 'store/asyncActions'
import { getCards, updateCardGrade } from 'store/asyncActions/cards'
import { CardsSliceInitialStateType } from './types'

const initialState: CardsSliceInitialStateType = {
	cards: [],
	searchCardValue: EMPTY_STRING,
	sortCards: '0updated',
	page: 1,
	pageCount: 5,
	cardsTotalCount: 0,
	packUserId: EMPTY_STRING
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
				state.packUserId = action.payload.packUserId
			})
			.addCase(updateCardGrade.fulfilled, (state, action) => {
				const card = state.cards.find(card => card._id === action.payload.card_id)
				if (card) {
					card.shots = action.payload.shots
					card.grade = action.payload.grade
				}
			})
			.addCase(logOut.fulfilled, (state) => {
				state.cards = []
				state.searchCardValue = EMPTY_STRING
				state.sortCards = '0updated'
				state.page = 1
				state.pageCount = 5
				state.cardsTotalCount = 0
			})
	},
})

export const {
	setSearchCardValue,
	setSortCards,
	setCardPage,
	setCardPageCount,
} = cardsSlice.actions

export default cardsSlice.reducer
