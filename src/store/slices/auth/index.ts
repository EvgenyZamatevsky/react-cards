import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { logOut, getAuthorizedUserData, registration } from 'store/asyncActions'
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
		setIsAuth(state, action: PayloadAction<any>) {

		},
	},
	extraReducers(builder) {
		builder
			.addCase(registration.fulfilled, (state) => {
				state.isRegister = true
			})
			.addCase(getAuthorizedUserData.fulfilled, (state, action) => {
				state.authorizedUserData = action.payload
				state.isAuth = true
			})
			.addCase(logOut.fulfilled, (state, action) => {
				state.authorizedUserData = null
				state.isAuth = false
			})
	},
})

export const { setIsAuth } = authSlice.actions

export default authSlice.reducer
