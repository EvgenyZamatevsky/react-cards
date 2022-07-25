import { registration } from 'store/asyncActions'
import authSlice from 'store/slices/auth'
import { AuthSliceInitialStateType } from 'store/slices/auth/types'

let startState: AuthSliceInitialStateType

beforeEach(() => {
	startState = {
		isRegister: false,
		isAuth: false,
		authorizedUserData: null
	}
})

test('property isRegister should change', () => {

	const registrationParams = { email: '', password: '' }

	const action = registration.fulfilled(undefined, 'requestId', registrationParams)

	const endState = authSlice(startState, action)

	expect(endState.isRegister).toBe(true)
})
