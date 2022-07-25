import { instance } from 'api/config'

export const AUTH = {
	register(email: string, password: string) {
		return instance.post('auth/register', { email, password })
	}
}
