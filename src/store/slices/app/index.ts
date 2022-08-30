import { getAuthorizedUserData, updateAuthorizedUserNameOrAvatar } from 'store/asyncActions'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from 'constants/base'
import { AppSliceInitialStateType } from './types'
import {
	isErrorRejected,
	isLoadingFulfilled,
	isLoadingPending,
	isLoadingRejected,
	isDisabledFulfilled,
	isDisabledPending,
	isDisabledRejected
} from 'store/helpers'

const initialState: AppSliceInitialStateType = {
	errorMessage: EMPTY_STRING,
	isInitializedApp: false,
	isLoading: false,
	isDisabled: false,
	isAvatarBroken: false,
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
		setIsAvatarBroken(state, action: PayloadAction<boolean>) {
			state.isAvatarBroken = action.payload
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
			.addCase(updateAuthorizedUserNameOrAvatar.fulfilled, (state) => {
				state.isAvatarBroken = false
			})
			.addMatcher(isErrorRejected, (state, action: PayloadAction<{ error: string }>) => {
				state.errorMessage = action.payload.error
			})
			.addMatcher(isLoadingPending, (state) => {
				state.isLoading = true
			})
			.addMatcher(isLoadingFulfilled, (state) => {
				state.isLoading = false
			})
			.addMatcher(isLoadingRejected, (state) => {
				state.isLoading = false
			})
			.addMatcher(isDisabledPending, (state) => {
				state.isDisabled = true
			})
			.addMatcher(isDisabledFulfilled, (state) => {
				state.isDisabled = false
			})
			.addMatcher(isDisabledRejected, (state) => {
				state.isDisabled = false
			})
	},
})

export const { setErrorMessage, setIsDisabled, setIsAvatarBroken } = appSlice.actions

export default appSlice.reducer
