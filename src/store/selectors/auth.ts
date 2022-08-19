import { RootStateType } from 'store'

export const selectIsRegister = (state: RootStateType): boolean => state.auth.isRegister

export const selectIsAuth = (state: RootStateType): boolean => state.auth.isAuth

export const selectAuthorizedUserId = (state: RootStateType): string => state.auth.authorizedUserData!?._id

export const selectAuthorizedUserAvatar = (state: RootStateType): string => state.auth.authorizedUserData!?.avatar

export const selectAuthorizedUserName = (state: RootStateType): string => state.auth.authorizedUserData!?.name

export const selectAuthorizedUserEmail = (state: RootStateType): string => state.auth.authorizedUserData!?.email
