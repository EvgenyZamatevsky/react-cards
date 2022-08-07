import { CardType } from 'api/cards/types'

export type CardsSliceInitialStateType = {
	cards: CardType[],
	searchCardValue: string
	sortCards: string
}
