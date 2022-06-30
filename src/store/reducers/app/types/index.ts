import { setErrorAC, setIsInitializeAC, setIsLoadingAC } from 'store/actions'
import { Nullable } from 'types'

export type InitialStateType = {
	error: Nullable<string>
	isLoading: boolean
	isInitialize: boolean
}

export type AppReducerActionsType =
	ReturnType<typeof setErrorAC> |
	ReturnType<typeof setIsLoadingAC> |
	ReturnType<typeof setIsInitializeAC> 
