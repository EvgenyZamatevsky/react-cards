import { RootStateType } from 'store'

export const selectIsAuth = (state: RootStateType): boolean => state.auth.isAuth
