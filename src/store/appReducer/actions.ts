import { Nullable } from 'types'

export const setErrorAC = (error: Nullable<string>) => ({ type: 'app/SET-ERROR', error } as const)

export const setIsLoadingAC = (isLoading: boolean) => ({ type: 'app/SET-IS-LOADING', isLoading } as const)

export const setIsInitializeAC = (isInitialize: boolean) => ({ type: 'app/SET-IS-INITIALIZE', isInitialize } as const)
