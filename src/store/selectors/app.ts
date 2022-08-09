import { RootStateType } from 'store'

export const selectErrorMessage = (state: RootStateType): string => state.app.errorMessage

export const selectIsInitializedApp = (state: RootStateType): boolean => state.app.isInitializedApp

export const selectIsLoading = (state: RootStateType): boolean => state.app.isLoading

export const selectIsDisabled = (state: RootStateType): boolean => state.app.isDisabled

export const selectIsModalActive = (state: RootStateType): boolean => state.app.isModalActive
