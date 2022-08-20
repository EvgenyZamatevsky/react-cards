import { instance } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { CardsResponseType, PayloadType, UpdatedGradeResponseType } from './types'

export const CARDS = {
	getCards(packId: string, cardQuestion: string, sortCards: string, page: number, pageCount: number) {

		const currentCardQuestion = cardQuestion === EMPTY_STRING ? EMPTY_STRING : `&cardQuestion=${cardQuestion}`

		return instance.get<CardsResponseType>(`cards/card
		?cardsPack_id=${packId}
		&page=${page}
		&pageCount=${pageCount}
		&sortCards=${sortCards}
		${currentCardQuestion}
		`)
	},
	addCard(packId: string, question: string, answer: string) {
		return instance.post(`cards/card`, { card: { cardsPack_id: packId, question, answer } })
	},
	removeCard(cardId: string) {
		return instance.delete(`cards/card?id=${cardId}`)
	},
	updateCardQuestionOrAnswer(cardId: string, payload: PayloadType) {
		return instance.put(`cards/card`, { card: { _id: cardId, question: payload.question, answer: payload.answer } })
	},
	updateCardGrade(cardId: string, updatedGrade: number) {
		return instance.put<UpdatedGradeResponseType>(`cards/grade`, { grade: updatedGrade, card_id: cardId })
	}
}
