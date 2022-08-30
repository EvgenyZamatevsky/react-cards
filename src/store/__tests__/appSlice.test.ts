import { AppSliceInitialStateType } from 'store/slices/app/types'
import appSlice, { setErrorMessage, setIsAvatarBroken, setIsDisabled } from 'store/slices/app'
import { getAuthorizedUserData, updateAuthorizedUserNameOrAvatar } from 'store/asyncActions'

let startState: AppSliceInitialStateType

beforeEach(() => {
	startState = {
		errorMessage: '',
		isAvatarBroken: false,
		isDisabled: false,
		isInitializedApp: false,
		isLoading: false
	}
})

test('correct error message should be set', (() => {
	const endState = appSlice(startState, setErrorMessage('some error occurred!'))

	expect(endState.errorMessage).toBe('some error occurred!')
}))

test('property isDisabled must be changed', (() => {
	const endState = appSlice(startState, setIsDisabled(true))

	expect(endState.isDisabled).toBe(true)
}))

test('property isDisabled must be changed', (() => {
	const endState = appSlice(startState, setIsDisabled(true))

	expect(endState.isDisabled).toBe(true)
}))

test('property isAvatarBroken must be changed', (() => {
	const endState = appSlice(startState, setIsAvatarBroken(true))

	expect(endState.isAvatarBroken).toBe(true)
}))

test('application must initialize', () => {

	const authorizedUserData = {
		_id: '',
		email: '',
		rememberMe: false,
		isAdmin: false,
		name: '',
		verified: false,
		publicCardPacksCount: 0,
		created: '' as unknown as Date,
		updated: '' as unknown as Date,
		__v: 0,
		token: '',
		tokenDeathTime: 0,
		avatar: ''
	}

	const action = getAuthorizedUserData.fulfilled(authorizedUserData, 'requestId', undefined)

	const endState = appSlice(startState, action)

	expect(endState.isInitializedApp).toBe(true)
})

test('property isAvatarBroken must be changed', () => {

	const action = updateAuthorizedUserNameOrAvatar.fulfilled({ avatar: '', name: '' }, 'requestId', { avatar: '', name: '' })

	const endState = appSlice(startState, action)

	expect(endState.isAvatarBroken).toBe(false)
})