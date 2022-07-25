import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { register } from 'store/asyncActions'
import { AuthSliceInitialStateType } from './types'

const initialState: AuthSliceInitialStateType = {
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
			.addCase(register.fulfilled, (state, action) => {

			})
	},
})

export const { setIsAuth } = authSlice.actions

export default authSlice.reducer
