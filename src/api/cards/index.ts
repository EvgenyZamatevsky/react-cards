import { instance } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { CardsResponseType, UpdatedGradeResponseType } from './types'

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
	removeCard(id: string) {
		return instance.delete(`cards/card?id=${id}`)
	},
	updateCard(id: string, payload: { question: string, answer: string }) {
		return instance.put(`cards/card`, { card: { _id: id, question: payload.question, answer: payload.answer } })
	},
	updateCardGrade(grade: number, card_id: string) {
		return instance.put<UpdatedGradeResponseType>(`cards/grade`, { grade, card_id })
	}
}
