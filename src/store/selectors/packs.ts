import { SelectedPackType } from './../slices/packs/types';
import { PackType } from 'api/packs/types'
import { RootStateType } from 'store'

export const selectPacks = (state: RootStateType): PackType[] => state.packs.packs

export const selectSearchPackValue = (state: RootStateType): string => state.packs.searchPackValue

export const selectSortValue = (state: RootStateType): string => state.packs.sortValue

export const selectMinValue = (state: RootStateType): number => state.packs.minValue

export const selectMaxValue = (state: RootStateType): number => state.packs.maxValue

export const selectMinCardsCount = (state: RootStateType): number => state.packs.minCardsCount

export const selectMaxCardsCount = (state: RootStateType): number => state.packs.maxCardsCount

export const selectPageCount = (state: RootStateType): number => state.packs.pageCount

export const selectPage = (state: RootStateType): number => state.packs.page

export const selectSelectedPack = (state: RootStateType): SelectedPackType => state.packs.selectedPack
