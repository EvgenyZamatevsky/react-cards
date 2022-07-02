import { PackType } from 'api/packs/types'
import { RootReducerType } from 'store/store'

export const selectPacks = (state: RootReducerType): PackType[] => state.packs.packs

export const selectCardPacksTotalCount = (state: RootReducerType): number => state.packs.cardPacksTotalCount

export const selectPage = (state: RootReducerType): number => state.packs.page

export const selectPageCount = (state: RootReducerType): number => state.packs.pageCount

export const selectMaxCardsCount = (state: RootReducerType): number => state.packs.maxCardsCount

export const selectMinCardsCount = (state: RootReducerType): number => state.packs.minCardsCount
