import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth'
import appSlice from './slices/app'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		app: appSlice
	}
})

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
