import { RootReducerType } from 'store/store'
import { Nullable } from 'types'

export const selectError = (state: RootReducerType): Nullable<string> => state.app.error

export const selectIsLoading = (state: RootReducerType): boolean => state.app.isLoading

export const selectIsInitialize = (state: RootReducerType): boolean => state.app.isInitialize
