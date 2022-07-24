import { CardType } from 'api/cards'
import { setCardsAC } from './actions'

export type InitialStateType = {
	cards: CardType[]
}

export type CardsReducerActionsType =
	ReturnType<typeof setCardsAC>
