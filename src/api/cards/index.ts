import { instance } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { CardsResponseType } from './types'

export const CARDS = {
	getCards(packId: string) {

		// const currentPackName = packName === EMPTY_STRING ? EMPTY_STRING : `&packName=${packName}`
		// const currentSortPacks = sortPacks === EMPTY_STRING ? EMPTY_STRING : `&sortPacks=${sortPacks}`
		// const currentUserId = userId === EMPTY_STRING || userId === undefined ? EMPTY_STRING : `&user_id=${userId}`
		// const currentMin = min <= 0 ? EMPTY_STRING : `&min=${min}`
		// const currentMax = max <= 0 ? EMPTY_STRING : `&max=${max}`

		return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${packId} `)
	},
}
