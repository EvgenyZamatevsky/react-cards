import { Nullable } from 'types'
import { setErrorAC, setIsLoadingAC, setIsInitializeAC } from './actions'

export type InitialStateType = {
	error: Nullable<string>
	isLoading: boolean
	isInitialize: boolean
}

export type AppReducerActionsType =
	ReturnType<typeof setErrorAC> |
	ReturnType<typeof setIsLoadingAC> |
	ReturnType<typeof setIsInitializeAC> 
