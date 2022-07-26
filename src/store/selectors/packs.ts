import { PackType } from 'api/packs/types'
import { RootStateType } from 'store'

export const selectPacks = (state: RootStateType): PackType[] => state.packs.packs
