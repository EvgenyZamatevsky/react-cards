import { UserDataType } from 'api/auth/types'
import { Nullable } from 'types'
import { setIsRegisterAC, setIsAuthAC, setUserDataAC, updateUserAC } from './actions'

export type InitialStateType = {
	isRegister: boolean
	isAuth: boolean
	userData: Nullable<UserDataType>
}

export type AuthReducerActionsType =
	ReturnType<typeof setIsRegisterAC> |
	ReturnType<typeof setIsAuthAC> |
	ReturnType<typeof setUserDataAC> |
	ReturnType<typeof updateUserAC> 
