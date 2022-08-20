import { CardType } from 'api/cards/types'
import { RootStateType } from 'store'

export const selectCards = (state: RootStateType): CardType[] => state.cards.cards

export const selectSearchCardValue = (state: RootStateType): string => state.cards.searchCardValue

export const selectSortCards = (state: RootStateType): string => state.cards.sortCards

export const selectCardPage = (state: RootStateType): number => state.cards.page

export const selectCardPageCount = (state: RootStateType): number => state.cards.pageCount

export const selectCardsTotalCount = (state: RootStateType): number => state.cards.cardsTotalCount

export const selectPackUserId = (state: RootStateType): string => state.cards.packUserId
