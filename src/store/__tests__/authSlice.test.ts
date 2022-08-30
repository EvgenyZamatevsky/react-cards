import { logOut, updateAuthorizedUserNameOrAvatar } from './../asyncActions/auth'
import { getAuthorizedUserData, login, registration } from 'store/asyncActions'
import authSlice, { setIsRegister } from 'store/slices/auth'
import { AuthSliceInitialStateType } from 'store/slices/auth/types'

let startState: AuthSliceInitialStateType

beforeEach(() => {
	startState = {
		authorizedUserData: {
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
		},
		isAuth: false,
		isRegister: false
	}
})

test('property isRegister must be changed', (() => {
	const endState = authSlice(startState, setIsRegister(true))

	expect(endState.isRegister).toBe(true)
}))

test('property isRegister must be changed', () => {

	const registrationDate = {
		email: 'test@mail.ru',
		password: '12345'
	}

	const action = registration.fulfilled(undefined, 'requestId', registrationDate)

	const endState = authSlice(startState, action)

	expect(endState.isRegister).toBe(true)
})

test('must obtain the data of an authorized user and property isAuth must be changed', () => {

	const authorizedUserData = {
		_id: '1',
		email: 'test@mail.ru',
		rememberMe: false,
		isAdmin: false,
		name: 'Oleg',
		verified: false,
		publicCardPacksCount: 1330,
		created: '11:08' as unknown as Date,
		updated: '11:09' as unknown as Date,
		__v: 0,
		token: '123',
		tokenDeathTime: 0,
		avatar: 'no'
	}

	const loginParams = {
		email: 'test2@mail.ru',
		password: '123214',
		rememberMe: false
	}

	const action = login.fulfilled(authorizedUserData, 'requestId', loginParams)

	const endState = authSlice(startState, action)

	expect(endState.isAuth).toBe(true)
	expect(endState.authorizedUserData).toBe(authorizedUserData)
})

test('must obtain the data of an authorized user and property isAuth must be changed', () => {

	const authorizedUserData = {
		_id: '1',
		email: 'test@mail.ru',
		rememberMe: false,
		isAdmin: false,
		name: 'Oleg',
		verified: false,
		publicCardPacksCount: 1330,
		created: '11:08' as unknown as Date,
		updated: '11:09' as unknown as Date,
		__v: 0,
		token: '123',
		tokenDeathTime: 0,
		avatar: 'no'
	}

	const action = getAuthorizedUserData.fulfilled(authorizedUserData, 'requestId', undefined)

	const endState = authSlice(startState, action)

	expect(endState.isAuth).toBe(true)
	expect(endState.authorizedUserData).toBe(authorizedUserData)
})

test('properties authorizedUserData and isAuth should be reset', () => {

	const action = logOut.fulfilled(undefined, 'requestId', undefined)

	const endState = authSlice(startState, action)

	expect(endState.authorizedUserData).toBe(null)
	expect(endState.isAuth).toBe(false)
})

test('the authorized user must have their avatar updated', () => {

	const action = updateAuthorizedUserNameOrAvatar.fulfilled({ avatar: 'new avatar', name: '' }, 'requestId', { avatar: 'new avatar' })

	const endState = authSlice(startState, action)

	expect(endState.authorizedUserData?.avatar).toBe('new avatar')
})

test('the authorized user must have their name updated', () => {

	const action = updateAuthorizedUserNameOrAvatar.fulfilled({ avatar: '', name: 'Snezhana' }, 'requestId', { name: 'Snezhana' })

	const endState = authSlice(startState, action)

	expect(endState.authorizedUserData?.name).toBe('Snezhana')
})