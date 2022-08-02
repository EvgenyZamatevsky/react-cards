import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { getPacks } from 'store/asyncActions/packs'
import { PacksSliceInitialStateType } from './types'

const initialState: PacksSliceInitialStateType = {
	packs: [],
	searchValue: EMPTY_STRING,
	sortValue: EMPTY_STRING,
	minValue: 0,
	maxValue: 0,
	minCardsCount: 0,
	maxCardsCount: 0,
	pageCount: 8
}

const packsSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setSortValue(state, action: PayloadAction<string>) {
			state.sortValue = action.payload
		},
		setMaxAndMinValue(state, action: PayloadAction<{ max: number, min: number }>) {
			state.maxValue = action.payload.max
			state.minValue = action.payload.min
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getPacks.fulfilled, (state, action) => {
				state.packs = action.payload.packs
				state.maxCardsCount = action.payload.maxCardsCount
				state.minCardsCount = action.payload.minCardsCount
			})
	},
})

export const { setSearchValue, setSortValue, setMaxAndMinValue } = packsSlice.actions

export default packsSlice.reducer
