import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth'

export const store = configureStore({
	reducer: {
		auth: authSlice,
	}
})

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
