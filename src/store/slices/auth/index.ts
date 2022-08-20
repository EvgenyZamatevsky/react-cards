import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { logOut, getAuthorizedUserData, registration, updateAuthorizedUser, login } from 'store/asyncActions'
import { AuthSliceInitialStateType } from './types'

const initialState: AuthSliceInitialStateType = {
	isRegister: false,
	isAuth: false,
	authorizedUserData: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsRegister(state, action: PayloadAction<boolean>) {
			state.isRegister = action.payload
		},
	},
	extraReducers(builder) {
		builder
			.addCase(registration.fulfilled, (state) => {
				state.isRegister = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.authorizedUserData = action.payload
				state.isAuth = true
			})
			.addCase(getAuthorizedUserData.fulfilled, (state, action) => {
				state.authorizedUserData = action.payload
				state.isAuth = true
			})
			.addCase(logOut.fulfilled, (state) => {
				state.authorizedUserData = null
				state.isAuth = false
			})
			.addCase(updateAuthorizedUser.fulfilled, (state, action) => {
				if (state.authorizedUserData) {
					state.authorizedUserData.avatar = action.payload.avatar
					state.authorizedUserData.name = action.payload.name
				}
			})
	},
})

export const { setIsRegister } = authSlice.actions

export default authSlice.reducer
