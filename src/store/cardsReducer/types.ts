import { CardsType } from 'api/cards'
import { setCardsAC } from './actions'

export type InitialStateType = {
	cards: CardsType[]
}

export type CardsReducerActionsType =
	ReturnType<typeof setCardsAC>
