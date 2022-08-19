import { instance, additionalInstance } from 'api/config'
import { LoginParamsType } from 'types'
import { AuthorizedUserDataType, UpdatedAuthorizedUserResponseType } from './types'

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/new-password/$token$'>
link</a>
</div>`

export const AUTH = {
	register(email: string, password: string) {
		return instance.post('auth/register', { email, password })
	},
	login(loginParams: LoginParamsType) {
		return instance.post<AuthorizedUserDataType>('auth/login', loginParams)
	},
	me() {
		return instance.post<AuthorizedUserDataType>('auth/me')
	},
	logOut() {
		return instance.delete('auth/me')
	},
	forgot(email: string) {
		return additionalInstance.post('auth/forgot', { email, message })
	},
	newPassword(password: string, resetPasswordToken: string) {
		return instance.post('auth/set-new-password', { password, resetPasswordToken })
	},
	updateAuthorizedUser(payload: { name: string, avatar: string }) {
		return instance.put<UpdatedAuthorizedUserResponseType>('auth/me', payload)
	},
}
