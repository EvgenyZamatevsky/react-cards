import { instance } from 'api/config'

export const CARDS = {
	getCards(id: string) {
		return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${id}`)
	}
}

export type CardsResponseType = {
	cards: CardsType[]
	cardsTotalCount: number
	maxGrade: number
	minGrade: number
	packUserId: string
	page: number
	pageCount: number
	token: string
	tokenDeathTime: number
}

export type CardsType = {
	answer: string
	answerImg: string
	answerVideo: string
	cardsPack_id: string
	comments: string
	created: string
	grade: number
	more_id: string
	question: string
	questionImg: string
	questionVideo: string
	rating: number
	shots: number
	type: string
	updated: string
	user_id: string
	__v: number
	_id: string
} 