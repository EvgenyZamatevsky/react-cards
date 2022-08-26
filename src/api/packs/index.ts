import { instance, instanceAdditional } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { PacksResponseType } from './types'

export const PACKS = {
	getPacks(
		packName: string,
		sortPacks: string,
		min: number,
		max: number,
		pageCount: number,
		page: number,
		userId: string
	) {
		const currentPackName = packName === EMPTY_STRING ? EMPTY_STRING : `&packName=${packName}`
		const currentUserId = userId === EMPTY_STRING ? EMPTY_STRING : `&user_id=${userId}`

		return instanceAdditional.get<PacksResponseType>(`cards/pack
		?pageCount=${pageCount}
		&page=${page}
		&sortPacks=${sortPacks}
		&min=${min}
		&max=${max}
		${currentPackName}
		${currentUserId}
		`)
	},
	addPack(packName: string, isPackPrivate: boolean) {
		return instanceAdditional.post(`cards/pack`, { cardsPack: { name: packName, private: isPackPrivate } })
	},
	removePack(packId: string) {
		return instanceAdditional.delete(`cards/pack?id=${packId}`)
	},
	updatePackName(packId: string, updatedPackName: string) {
		return instanceAdditional.put(`cards/pack`, { cardsPack: { _id: packId, name: updatedPackName } })
	},
}
