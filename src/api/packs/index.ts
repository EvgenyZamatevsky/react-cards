import { instance } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { PacksResponseType } from './types'

export const PACKS = {
	getPacks(packName: string, sortPacks: string, min: number, max: number, pageCount: number, page: number, userId: string) {
		return instance.get<PacksResponseType>(`cards/pack`, {
			params: {
				pageCount,
				page,
				sortPacks,
				min,
				max,
				...packName === EMPTY_STRING ? EMPTY_STRING : { packName },
				...userId === EMPTY_STRING ? EMPTY_STRING : { user_id: userId }
			}
		})
	},
	addPack(packName: string, isPackPrivate: boolean) {
		return instance.post(`cards/pack`, { cardsPack: { name: packName, private: isPackPrivate } })
	},
	removePack(packId: string) {
		return instance.delete(`cards/pack?id=${packId}`)
	},
	updatePackName(packId: string, updatedPackName: string) {
		return instance.put(`cards/pack`, { cardsPack: { _id: packId, name: updatedPackName } })
	},
}
