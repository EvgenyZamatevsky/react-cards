import { AuthorizedUserDataType } from 'api/auth/types'
import { RootStateType } from 'store'
import { Nullable } from 'types'

export const selectIsRegister = (state: RootStateType): boolean => state.auth.isRegister

export const selectIsAuth = (state: RootStateType): boolean => state.auth.isAuth

export const selectAuthorizedUserData = (state: RootStateType): Nullable<AuthorizedUserDataType> => {
	return state.auth.authorizedUserData
}
