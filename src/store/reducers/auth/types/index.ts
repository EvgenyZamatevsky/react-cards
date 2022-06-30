import { UserDataType } from 'api/auth/types'
import { setIsAuthAC, setIsRegisterAC, setUserDataAC, updateUserAC } from 'store/actions'
import { Nullable } from 'types'

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
