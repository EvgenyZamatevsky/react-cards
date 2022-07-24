import { instance, instanceHeroku } from 'api/config'
import { Path } from 'enums'
import {
	LoginDataType,
	UserDataType,
	RegisterDataType,
	ForgotResponseType,
	NewPasswordDataType,
	UpdateUserType,
	LogOutResponseType,
	NewPasswordResponseType
} from './types'

const message = `<div style="background-color: lime; padding: 15px">password recovery link: 
<a href='http://localhost:3000/#${Path.newPassword}/$token$'>link</a></div>`

export const AUTH = {
	login(loginData: LoginDataType) {
		return instance.post<UserDataType>('auth/login', loginData)
	},
	register(registerData: RegisterDataType) {
		return instance.post<{ error?: string }>('auth/register', registerData)
	},
	me() {
		return instance.post<UserDataType>('auth/me')
	},
	logOut() {
		return instance.delete<LogOutResponseType>('auth/me')
	},
	forgot(email: string) {
		return instanceHeroku.post<ForgotResponseType>('auth/forgot', { email, message })
	},
	newPassword(newPassword: NewPasswordDataType) {
		return instanceHeroku.post<NewPasswordResponseType>('auth/set-new-password', newPassword)
	},
	updateUser(payload: UpdateUserType) {
		return instance.put<UserDataType>('auth/me', payload)
	}
}
