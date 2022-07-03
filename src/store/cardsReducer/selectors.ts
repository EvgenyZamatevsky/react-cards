import { CardsType } from 'api/cards'
import { RootReducerType } from 'store/store'

export const selectCards = (state: RootReducerType): CardsType[] => state.cards.cards
