import { instance } from 'api/config'
import { LoginParamsType } from 'types'
import { AddedUserType, AuthorizedUserDataType } from './types'

export const AUTH = {
	register(email: string, password: string) {
		return instance.post<AddedUserType>('auth/register', { email, password })
	},
	login(loginParams: LoginParamsType) {
		return instance.post<AuthorizedUserDataType>('auth/login', loginParams)
	},
	me() {
		return instance.post<AuthorizedUserDataType>('auth/me')
	},
	logOut() {
		return instance.delete<{ info: string }>('auth/me')
	},
}
