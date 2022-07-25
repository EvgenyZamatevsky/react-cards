import { instance, additionalInstance } from 'api/config'
import { LoginParamsType } from 'types'
import { AddedUserType, AuthorizedUserDataType } from './types'

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/new-password/$token$'>
link</a>
</div>`

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
	forgot(email: string) {
		return additionalInstance.post<ForgotResponseType>('auth/forgot', { email, message })
	},
}

export type ForgotParamsType = {
	email: string
	message: string
}

export type ForgotResponseType = {
	answer: boolean
	html: boolean
	info: string
	success: boolean
}