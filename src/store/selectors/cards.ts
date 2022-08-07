import { CardType } from 'api/cards/types'
import { RootStateType } from 'store'

export const selectCards = (state: RootStateType): CardType[] => state.cards.cards

export const selectSearchCardValue = (state: RootStateType): string => state.cards.searchCardValue

export const selectSortCards = (state: RootStateType): string => state.cards.sortCards
