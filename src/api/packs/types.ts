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

export type PackType = {
	_id: string
	user_id: string // ид пользователя создавшего колоду
	user_name: string // имя пользователя создавшего колоду
	private: boolean // приватная колода или публичная
	name: string // имя колоды 
	path: string // не используется
	grade: number // Звездочки (рейтинг) // не используется вроде
	shots: number // сколько раз оценили колоду
	cardsCount: number // количество карточек в колоде
	type: string
	rating: number // не используется
	created: string // когда создана колода
	updated: string // когда обновлена колода
	more_id: string // не используется
	__v: number // не используется
}

export type DataPacksType<T> = {
	cardsPack: T
}


export type CreatePackType = {
	name: string
	deckCover: string
	private: boolean
}

export type UpdatePackType = {
	_id: string
	name: string
}

export type createPackResponseType = {
	newCardsPack: PackType
	token: string
	tokenDeathTime: number
}