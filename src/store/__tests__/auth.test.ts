import authSlice from 'store/slices/auth'
import { AuthSliceInitialStateType } from 'store/slices/auth/types'

let startState: AuthSliceInitialStateType

beforeEach(() => {
	startState = {
		isAuth: false
	}
})

test('', () => {

	//const action = setIsLoading(true)

	//const endState = exampleSlice(startState, action)

	//expect(endState.isLoading).toBe(true)
})
