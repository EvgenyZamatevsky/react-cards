import { instance } from 'api/config'
import { AddedUserType } from './types'

export const AUTH = {
	register(email: string, password: string) {
		return instance.post<AddedUserType>('auth/register', { email, password })
	}
}
