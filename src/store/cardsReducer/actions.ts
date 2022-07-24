import { CardType } from 'api/cards'

export const setCardsAC = (cards: CardType[]) => ({ type: 'cards/SET-CARDS', cards } as const)
