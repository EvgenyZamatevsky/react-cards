import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { logOut } from 'store/asyncActions'
import { getPacks } from 'store/asyncActions/packs'
import { PacksSliceInitialStateType, SelectedPackType } from './types'

const initialState: PacksSliceInitialStateType = {
	packs: [],
	searchPackValue: EMPTY_STRING,
	sortPacks: '0updated',
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
		setSortPacks(state, action: PayloadAction<string>) {
			state.sortPacks = action.payload
		},
		setMaxValue(state, action: PayloadAction<number>) {
			state.maxValue = action.payload
		},
		setMinValue(state, action: PayloadAction<number>) {
			state.minValue = action.payload
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
		resetMinValueAndMaxValue(state) {
			state.maxValue = 110
			state.minValue = 0
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
				state.sortPacks = '0updated'
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
	setSortPacks,
	setMaxValue,
	setMinValue,
	setSelectedPack,
	setPackPage,
	setPackPageCount,
	resetMinValueAndMaxValue,
} = packsSlice.actions

export default packsSlice.reducer
