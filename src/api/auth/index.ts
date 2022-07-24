import { instance } from 'api/config'

export const AUTH = {
	login() {
		return instance.post('')
	}
}
