import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth'
import appSlice from './slices/app'
import packsSlice from './slices/packs'
import cardsSlice from './slices/cards'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		app: appSlice,
		packs: packsSlice,
		cards: cardsSlice,
	}
})

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
