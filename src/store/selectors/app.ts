import { RootStateType } from 'store'

export const selectErrorMessage = (state: RootStateType): string => state.app.errorMessage

export const selectIsInitializedApp = (state: RootStateType): boolean => state.app.isInitializedApp

export const selectIsLoading = (state: RootStateType): boolean => state.app.isLoading
