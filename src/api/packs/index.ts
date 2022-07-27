import { instance } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { PacksResponseType } from './types'

export const PACKS = {
	getPacks(packName: string, sortPacks: string) {

		// const currentPackName = packName === EMPTY_STRING ? EMPTY_STRING : `?packName=${packName}`
		const currentSortPacks = sortPacks === EMPTY_STRING ? EMPTY_STRING : `&sortPacks=${sortPacks}`

		return instance.get<PacksResponseType>(`cards/pack
		?packName=${packName}${currentSortPacks}`)
	}
}