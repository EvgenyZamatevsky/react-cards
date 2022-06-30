import { InitialStateType, AppReducerActionsType } from './types'

const initialState: InitialStateType = {
	error: null,
	isLoading: false,
	isInitialize: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
	switch (action.type) {
		case 'app/SET-ERROR':
			return { ...state, error: action.error }
		case 'app/SET-IS-LOADING':
			return { ...state, isLoading: action.isLoading }
		case 'app/SET-IS-INITIALIZE':
			return { ...state, isInitialize: action.isInitialize }

		default:
			return state
	}
}
