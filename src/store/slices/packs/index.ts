import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPacks } from 'store/asyncActions/packs'
import { PacksSliceInitialStateType } from './types'

const initialState: PacksSliceInitialStateType = {
	packs: [],
	searchValue: '',
	isInitializedPack: false
}

const packsSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setIsInitializedPack(state, action: PayloadAction<boolean>) {
			state.isInitializedPack = action.payload
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getPacks.fulfilled, (state, action) => {
				state.packs = action.payload
				state.isInitializedPack = true
			})
	},
})

export const { setSearchValue, setIsInitializedPack } = packsSlice.actions

export default packsSlice.reducer
