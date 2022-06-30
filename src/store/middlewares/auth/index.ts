import { AUTH } from 'api'
import { RegisterDataType, LoginDataType, NewPasswordDataType, UpdateUserType } from 'api/auth/types'
import { setErrorAC, setIsAuthAC, setIsLoadingAC, setIsRegisterAC, setUserDataAC, updateUserAC } from 'store/actions'
import { ThunkType } from 'store/store'

export const registerTC = (registerData: RegisterDataType): ThunkType => async (dispatch) => {
	try {
		dispatch(setIsLoadingAC(true))

		const response = await AUTH.register(registerData)

		dispatch(setIsRegisterAC(true))
		dispatch(setIsLoadingAC(false))
	} catch (e: any) {
		const error = e.response
			? e.response.data.error
			: (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
		dispatch(setIsLoadingAC(false))
	}
}

export const getUserDataTC = (): ThunkType => async (dispatch) => {
	try {
		dispatch(setIsLoadingAC(true))

		const response = await AUTH.me()
		const userData = response.data

		dispatch(setUserDataAC(userData))
		dispatch(setIsAuthAC(true))
		dispatch(setIsLoadingAC(false))
	} catch (e: any) {
		const error = e.response
			? e.response.data.error
			: (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
		dispatch(setIsLoadingAC(false))
	}
}

export const loginTC = (loginData: LoginDataType): ThunkType => async (dispatch) => {
	try {
		const response = await AUTH.login(loginData)

		dispatch(getUserDataTC())
	} catch (e: any) {
		const error = e.response
			? e.response.data.error
			: (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
	}
}

export const logOutTC = (): ThunkType => async (dispatch) => {
	try {
		dispatch(setIsLoadingAC(true))

		const response = await AUTH.logOut()

		dispatch(setIsAuthAC(false))
		dispatch(setUserDataAC(null))
		dispatch(setIsLoadingAC(false))
	} catch (e: any) {
		const error = e.response
			? e.response.data.error
			: (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
		dispatch(setIsLoadingAC(false))
	}
}

export const forgotTC = (email: string): ThunkType => async (dispatch) => {
	try {
		dispatch(setIsLoadingAC(true))

		const response = await AUTH.forgot(email)

		dispatch(setIsLoadingAC(false))
	} catch (e: any) {
		const error = e.response
			? e.response.data.error
			: (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
		dispatch(setIsLoadingAC(false))
	}
}

export const newPasswordTC = (newPassword: NewPasswordDataType): ThunkType => async (dispatch) => {
	try {
		dispatch(setIsLoadingAC(true))

		const response = await AUTH.newPassword(newPassword)

		dispatch(setIsLoadingAC(false))
	} catch (e: any) {
		const error = e.response
			? e.response.data.error
			: (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
		dispatch(setIsLoadingAC(false))
	}
}

export const updateUserTC = (updatedUser: UpdateUserType): ThunkType => async (dispatch, getState) => {
	const userData = getState().auth.userData

	const payload = {
		name: userData?.name,
		avatar: userData?.avatar,
		...updatedUser
	}

	try {
		dispatch(setIsLoadingAC(true))

		const response = await AUTH.updateUser(payload)

		dispatch(updateUserAC(updatedUser))
		dispatch(setIsLoadingAC(false))
	} catch (e: any) {
		const error = e.response
			? e.response.data.error
			: (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
		dispatch(setIsLoadingAC(false))
	}
}
