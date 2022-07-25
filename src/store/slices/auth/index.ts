import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { logOut, getAuthorizedUserData, registration, updateAuthorizedUser } from 'store/asyncActions'
import { AuthSliceInitialStateType } from './types'

const initialState: AuthSliceInitialStateType = {
	isRegister: false,
	isAuth: false,
	authorizedUserData: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(registration.fulfilled, (state) => {
				state.isRegister = true
			})
			.addCase(getAuthorizedUserData.fulfilled, (state, action) => {
				state.authorizedUserData = action.payload
				state.isAuth = true
			})
			.addCase(updateAuthorizedUser.fulfilled, (state, action) => {
				state.authorizedUserData = action.payload
			})
			.addCase(logOut.fulfilled, (state) => {
				state.authorizedUserData = null
				state.isAuth = false
			})
	},
})

export default authSlice.reducer
