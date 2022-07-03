import { CardsType } from 'api/cards'

export const setCardsAC = (cards: CardsType[]) => ({ type: 'cards/SET-CARDS', cards } as const)
