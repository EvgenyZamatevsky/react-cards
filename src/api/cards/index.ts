import { instance } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { CardsResponseType } from './types'

export const CARDS = {
	getCards(packId: string, cardQuestion: string, sortCards: string, page: number, pageCount: number) {

		const currentCardQuestion = cardQuestion === EMPTY_STRING ? EMPTY_STRING : `&cardQuestion=${cardQuestion}`
		const currentSortCards = sortCards === EMPTY_STRING ? EMPTY_STRING : `&sortCards=${sortCards}`
		// const currentUserId = userId === EMPTY_STRING || userId === undefined ? EMPTY_STRING : `&user_id=${userId}`
		// const currentMin = min <= 0 ? EMPTY_STRING : `&min=${min}`
		// const currentMax = max <= 0 ? EMPTY_STRING : `&max=${max}`

		return instance.get<CardsResponseType>(`cards/card
		?cardsPack_id=${packId}
		&page=${page}
		&pageCount=${pageCount}
		${currentCardQuestion}
		${currentSortCards}
		`)
	},
	addCard(packId: string, question: string, answer: string) {
		return instance.post(`cards/card`, {
			card: { cardsPack_id: packId, question, answer }
		})
	},
	removeCard(id: string) {
		return instance.delete(`cards/card?id=${id}`)
	},
	updateCardQuestion(id: string, question: string) {
		return instance.put(`cards/card`, { card: { _id: id, question } })
	},
}
