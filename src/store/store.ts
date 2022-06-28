import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from 'redux-thunk'
import { appReducer } from './reducers/app'

const rootReducer = combineReducers({
	app: appReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// types
export type RootReducerType = ReturnType<typeof rootReducer>
export type AppActionsType = Parameters<typeof rootReducer>[1]
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, AppActionsType>
//export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
