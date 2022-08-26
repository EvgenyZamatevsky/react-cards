import { instance, instanceAdditional } from 'api/config'
import { AuthorizedUserDataType, PayloadType, UpdatedAuthorizedUserResponseType } from './types'

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/new-password/$token$'>
link</a>
</div>`

export const AUTH = {
	register(email: string, password: string) {
		return instanceAdditional.post('auth/register', { email, password })
	},
	login(email: string, password: string, rememberMe: boolean) {
		return instanceAdditional.post<AuthorizedUserDataType>('auth/login', { email, password, rememberMe })
	},
	me() {
		return instanceAdditional.post<AuthorizedUserDataType>('auth/me')
	},
	logOut() {
		return instanceAdditional.delete('auth/me')
	},
	forgot(email: string) {
		return instanceAdditional.post('auth/forgot', { email, message })
	},
	setNewPassword(updatedPassword: string, resetPasswordToken: string) {
		return instanceAdditional.post('auth/set-new-password', { password: updatedPassword, resetPasswordToken })
	},
	updateAuthorizedUserNameOrAvatar(payload: PayloadType) {
		return instanceAdditional.put<UpdatedAuthorizedUserResponseType>('auth/me', payload)
	},
}
