import { isLoadingFulfilled, isLoadingPending, isLoadingRejected } from './../../helpers/app'
import { getAuthorizedUserData } from 'store/asyncActions'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { isErrorRejected } from 'store/helpers'
import { AppSliceInitialStateType } from './types'
import { getPacks } from 'store/asyncActions/packs'

const initialState: AppSliceInitialStateType = {
	errorMessage: EMPTY_STRING,
	isInitializedApp: false,
	isLoading: false,
	isDisabled: false
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setErrorMessage(state, action: PayloadAction<string>) {
			state.errorMessage = action.payload
		},
		setIsDisabled(state, action: PayloadAction<boolean>) {
			state.isDisabled = action.payload
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAuthorizedUserData.fulfilled, (state) => {
				state.isInitializedApp = true
			})
			.addCase(getAuthorizedUserData.rejected, (state) => {
				state.isInitializedApp = true
			})
			.addCase(getPacks.pending, (state) => {
				state.isDisabled = true
			})
			.addCase(getPacks.fulfilled, (state) => {
				state.isDisabled = false
			})
			.addCase(getPacks.rejected, (state) => {
				//state.isDisabled = true
			})
			.addMatcher(isErrorRejected, (state, action: PayloadAction<{ error: string }>) => {
				state.errorMessage = action.payload.error
			})
			.addMatcher(isLoadingPending, (state) => {
				state.isLoading = true
			})
			.addMatcher(isLoadingFulfilled, (state, action) => {
				state.isLoading = false
			})
			.addMatcher(isLoadingRejected, (state) => {
				state.isLoading = false
			})
	},
})

export const { setErrorMessage, setIsDisabled } = appSlice.actions

export default appSlice.reducer