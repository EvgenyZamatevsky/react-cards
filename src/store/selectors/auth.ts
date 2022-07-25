import { RootStateType } from 'store'

export const selectIsRegister = (state: RootStateType): boolean => state.auth.isRegister

export const selectIsAuth = (state: RootStateType): boolean => state.auth.isAuth
