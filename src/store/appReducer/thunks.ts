import { getUserDataTC } from 'store/authReducer/thunks'
import { ThunkType } from 'store/store'
import { setIsInitializeAC } from './actions'

export const initializeAppTC = (): ThunkType => async (dispatch) => {

	const promise = dispatch(getUserDataTC())

	Promise.all([promise]).then(() => {
		dispatch(setIsInitializeAC(true))
	})
}
