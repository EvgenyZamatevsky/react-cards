import { setIsInitializeAC } from 'store/actions'
import { ThunkType } from 'store/store'
import { getUserDataTC } from '../auth'

export const initializeAppTC = (): ThunkType => async (dispatch) => {

	const promise = dispatch(getUserDataTC())

	Promise.all([promise]).then(() => {
		dispatch(setIsInitializeAC(true))
	})
}
