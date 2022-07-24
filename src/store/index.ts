import { configureStore } from '@reduxjs/toolkit'
import exampleSlice from './slices/example'

export const store = configureStore({
	reducer: {
		example: exampleSlice,
	}
})

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
