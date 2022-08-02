import { instance } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { PacksResponseType } from './types'

export const PACKS = {
	getPacks(packName: string, sortPacks: string, min: number, max: number, pageCount: number) {

		const currentPackName = packName === EMPTY_STRING ? EMPTY_STRING : `&packName=${packName}`
		const currentSortPacks = sortPacks === EMPTY_STRING ? EMPTY_STRING : `&sortPacks=${sortPacks}`
		const currentMin = min <= 0 ? EMPTY_STRING : `&min=${min}`
		const currentMax = max <= 0 ? EMPTY_STRING : `&max=${max}`

		return instance.get<PacksResponseType>(`cards/pack
		?pageCount=${pageCount}${currentPackName}${currentSortPacks}${currentMin}${currentMax}`)
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
