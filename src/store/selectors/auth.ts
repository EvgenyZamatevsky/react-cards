import { UserDataType } from 'api/auth/types'
import { RootReducerType } from 'store/store'
import { Nullable } from 'types'

export const selectIsRegister = (state: RootReducerType): boolean => state.auth.isRegister

export const selectIsAuth = (state: RootReducerType): boolean => state.auth.isAuth

export const selectUserData = (state: RootReducerType): Nullable<UserDataType> => state.auth.userData
