import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPacks } from 'store/asyncActions/packs'
import { PacksSliceInitialStateType } from './types'

const initialState: PacksSliceInitialStateType = {
	packs: []
}

const packsSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getPacks.fulfilled, (state, action) => {
				state.packs = action.payload
			})
	},
})

export const { } = packsSlice.actions

export default packsSlice.reducer
