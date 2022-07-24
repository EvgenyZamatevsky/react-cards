import { CardType } from 'api/cards'
import { RootReducerType } from 'store/store'

export const selectCards = (state: RootReducerType): CardType[] => state.cards.cards
