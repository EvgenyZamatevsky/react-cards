import { AuthorizedUserDataType } from 'api/auth/types'
import { Nullable } from 'types'

export type AuthSliceInitialStateType = {
	isRegister: boolean
	isAuth: boolean
	authorizedUserData: Nullable<AuthorizedUserDataType>
}
