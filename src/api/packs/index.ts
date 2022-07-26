import { instance } from 'api/config'

export const PACKS = {
	getPacks() {
		return instance.get<any>(`cards/pack`)
	}
}
