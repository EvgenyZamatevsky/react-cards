import { UserDataType, UpdateUserType } from 'api/auth/types'
import { Nullable } from 'types'

export const setIsRegisterAC = (isRegister: boolean) => ({ type: 'auth/SET-IS-REGISTER', isRegister } as const)

export const setUserDataAC = (userData: Nullable<UserDataType>) => ({ type: 'auth/SET-USER-DATA', userData } as const)

export const setIsAuthAC = (isAuth: boolean) => ({ type: 'auth/SET-IS-AUTH', isAuth } as const)

export const updateUserAC = (updatedUser: UpdateUserType) => ({ type: 'auth/UPDATE-USER', updatedUser } as const)
