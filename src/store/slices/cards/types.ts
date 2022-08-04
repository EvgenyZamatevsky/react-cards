import { CardType } from 'api/cards/types'

export type CardsSliceInitialStateType = {
	cards: CardType[],
	cardQuestion: string
	sortCards: string
}
