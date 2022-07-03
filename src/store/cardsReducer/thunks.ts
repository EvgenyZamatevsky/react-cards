import { CARDS } from 'api/cards'
import { setIsLoadingAC, setErrorAC } from 'store/appReducer/actions'
import { ThunkType } from 'store/store'
import { setCardsAC } from './actions'

export const getCardsTC = (cardId: string): ThunkType => async (dispatch) => {
	try {
		dispatch(setIsLoadingAC(true))

		const response = await CARDS.getCards(cardId)
		const { cards } = response.data

		dispatch(setCardsAC(cards))
	} catch (e: any) {
		const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
	} finally {
		dispatch(setIsLoadingAC(false))
	}
}
