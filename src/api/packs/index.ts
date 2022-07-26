import { instance } from 'api/config'
import { PacksResponseType } from './types'

export const PACKS = {
	getPacks(packName: string) {
		return instance.get<PacksResponseType>(`cards/pack?packName=${packName}`)
	}
}
