import { UserDataType } from 'api/auth/types'
import { InitialStateType, AuthReducerActionsType } from './types'

const initialState: InitialStateType = {
	isRegister: false,
	isAuth: false,
	userData: null
}

export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
	switch (action.type) {
		case 'auth/SET-IS-REGISTER':
			return { ...state, isRegister: action.isRegister }
		case 'auth/SET-IS-AUTH':
			return { ...state, isAuth: action.isAuth }
		case 'auth/SET-USER-DATA':
			return { ...state, userData: action.userData }
		case 'auth/UPDATE-USER':
			return { ...state, userData: { ...state.userData, ...action.updatedUser } as UserDataType }

		default:
			return state
	}
}
