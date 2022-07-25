import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { registration } from 'store/asyncActions'
import { AuthSliceInitialStateType } from './types'

const initialState: AuthSliceInitialStateType = {
	isRegister: false,
	isAuth: false
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
			.addCase(registration.fulfilled, (state, action) => {
				state.isRegister = true
				console.log(action)
			})
	},
})

export const { setIsAuth } = authSlice.actions

export default authSlice.reducer
