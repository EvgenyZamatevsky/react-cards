import { instance } from 'api/config'
import { PacksResponseType } from './types'

export const PACKS = {
	getPacks() {
		return instance.get<PacksResponseType>(`cards/pack`)
	}
}
