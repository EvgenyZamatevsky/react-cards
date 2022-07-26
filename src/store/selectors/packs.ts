import { PackType } from 'api/packs/types'
import { RootStateType } from 'store'

export const selectPacks = (state: RootStateType): PackType[] => state.packs.packs

export const selectSearchValue = (state: RootStateType): string => state.packs.searchValue
