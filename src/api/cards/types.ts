export type CardType = {
	_id: string
	cardsPack_id: string
	user_id: string
	answer: string
	question: string
	grade: number
	shots: number
	questionImg: string
	answerImg: string
	answerVideo: string
	questionVideo: string
	comments: string
	type: string
	rating: number
	more_id: string
	created: Date
	updated: Date
	__v: number
}

export type CardsResponseType = {
	cards: CardType[]
	packUserId: string
	page: number
	pageCount: number
	cardsTotalCount: number
	minGrade: number
	maxGrade: number
	token: string
	tokenDeathTime: number
}

export type UpdatedGradeType = {
	_id: string
	cardsPack_id: string
	card_id: string
	user_id: string
	grade: number
	shots: number
	more_id: string
	created: Date
	updated: Date
	__v: number
}

export type UpdatedGradeResponseType = {
	updatedGrade: UpdatedGradeType
	token: string
	tokenDeathTime: number
}
