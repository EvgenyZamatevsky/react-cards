export type PackType = {
	_id: string
	user_id: string
	user_name: string
	private: boolean
	name: string
	path: string
	grade: number
	shots: number
	cardsCount: number
	type: string
	rating: number
	created: Date
	updated: Date
	more_id: string
	__v: number
	deckCover: string
}

export type PacksResponseType = {
	cardPacks: PackType[]
	page: number
	pageCount: number
	cardPacksTotalCount: number
	minCardsCount: number
	maxCardsCount: number
	token: string
	tokenDeathTime: number
}
