import { instance } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { PacksResponseType } from './types'

export const PACKS = {
	getPacks(packName: string, sortPacks: string, min: number, max: number) {

		// const currentPackName = packName === EMPTY_STRING ? EMPTY_STRING : `?packName=${packName}`
		const currentSortPacks = sortPacks === EMPTY_STRING ? EMPTY_STRING : `&sortPacks=${sortPacks}`
		const currentMin = min <= 0 ? EMPTY_STRING : `&min=${min}`
		const currentMax = max <= 0 ? EMPTY_STRING : `&max=${max}`

		return instance.get<PacksResponseType>(`cards/pack?packName=
		${packName}${currentSortPacks}${currentMin}${currentMax}`)
	}
}
