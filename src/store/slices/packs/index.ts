import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { getPacks } from 'store/asyncActions/packs'
import { PacksSliceInitialStateType } from './types'

const initialState: PacksSliceInitialStateType = {
	packs: [],
	searchValue: EMPTY_STRING,
	sortValue: EMPTY_STRING,
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
	},
	extraReducers(builder) {
		builder
			.addCase(getPacks.fulfilled, (state, action) => {
				state.packs = action.payload
			})
	},
})

export const { setSearchValue, setSortValue } = packsSlice.actions

export default packsSlice.reducer
