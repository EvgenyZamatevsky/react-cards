import { instance } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { PacksResponseType } from './types'

export const PACKS = {
	getPacks(
		packName: string, sortPacks: string, min: number, max: number, pageCount: number, page: number, userId?: string) {

		const currentPackName = packName === EMPTY_STRING ? EMPTY_STRING : `&packName=${packName}`
		const currentSortPacks = sortPacks === EMPTY_STRING ? EMPTY_STRING : `&sortPacks=${sortPacks}`
		const currentUserId = userId === EMPTY_STRING || userId === undefined ? EMPTY_STRING : `&user_id=${userId}`
		const currentMin = min <= 0 ? EMPTY_STRING : `&min=${min}`
		const currentMax = max <= 0 ? EMPTY_STRING : `&max=${max}`

		return instance.get<PacksResponseType>(`cards/pack
		?pageCount=${pageCount}&page=${page}${currentPackName}${currentSortPacks}${currentMin}${currentMax}${currentUserId}`)
	},
	addPack(name: string, isPrivate: boolean) { // private доработать
		return instance.post(`cards/pack`, { cardsPack: { name: name, private: isPrivate } })
	},
	removePack(id: string) {
		return instance.delete(`cards/pack?id=${id}`)
	},
	updatePackName(_id: string, name: string) {
		return instance.put(`cards/pack`, { cardsPack: { _id, name } })
	},
}
