import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { logOut } from 'store/asyncActions'
import { getPacks } from 'store/asyncActions/packs'
import { PacksSliceInitialStateType, SelectedPackType } from './types'

const initialState: PacksSliceInitialStateType = {
	packs: [],
	searchPackValue: EMPTY_STRING,
	sortValue: '0updated',
	minCardsCount: 0,
	maxCardsCount: 110,
	minValue: 0,
	maxValue: 110,
	pageCount: 5,
	page: 1,
	packsTotalCount: 0,
	selectedPack: 'All'
}

const packsSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {
		setSearchPackValue(state, action: PayloadAction<string>) {
			state.searchPackValue = action.payload
		},
		setSortValue(state, action: PayloadAction<string>) {
			state.sortValue = action.payload
		},
		setMaxAndMinValue(state, action: PayloadAction<{ max: number, min: number }>) {
			state.maxValue = action.payload.max
			state.minValue = action.payload.min
		},
		setSelectedPack(state, action: PayloadAction<SelectedPackType>) {
			state.selectedPack = action.payload
		},
		setPackPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
		setPackPageCount(state, action: PayloadAction<number>) {
			state.pageCount = action.payload
		},

	},
	extraReducers(builder) {
		builder
			.addCase(getPacks.fulfilled, (state, action) => {
				state.packs = action.payload.packs
				state.maxCardsCount = action.payload.maxCardsCount
				state.minCardsCount = action.payload.minCardsCount
				state.packsTotalCount = action.payload.packsTotalCount
			})
			.addCase(logOut.fulfilled, (state) => {
				state.packs = []
				state.searchPackValue = EMPTY_STRING
				state.sortValue = '0updated'
				state.minValue = 0
				state.maxValue = 110
				state.minCardsCount = 0
				state.maxCardsCount = 110
				state.pageCount = 5
				state.page = 1
				state.packsTotalCount = 0
				state.selectedPack = 'All'
			})
	},
})

export const {
	setSearchPackValue,
	setSortValue,
	setMaxAndMinValue,
	setSelectedPack,
	setPackPage,
	setPackPageCount,
} = packsSlice.actions

export default packsSlice.reducer
