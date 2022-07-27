import { PackType } from 'api/packs/types'
import { RootStateType } from 'store'

export const selectPacks = (state: RootStateType): PackType[] => state.packs.packs

export const selectSearchValue = (state: RootStateType): string => state.packs.searchValue

export const selectSortValue = (state: RootStateType): string => state.packs.sortValue

export const selectMinValue = (state: RootStateType): number => state.packs.minValue

export const selectMaxValue = (state: RootStateType): number => state.packs.maxValue

export const selectMinCardsCount = (state: RootStateType): number => state.packs.minCardsCount

export const selectMaxCardsCount = (state: RootStateType): number => state.packs.maxCardsCount
