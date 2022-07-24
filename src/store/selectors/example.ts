import { RootStateType } from 'store'
import { SupplementedItemType } from 'store/slices/example/types'

export const selectIsLoading = (state: RootStateType): boolean => state.example.isLoading
export const selectItems = (state: RootStateType): SupplementedItemType[] => state.example.items
