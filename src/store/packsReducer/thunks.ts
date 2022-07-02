import { ChangedPayloadType, PACKS, PayloadType } from 'api/packs'
import { setIsLoadingAC, setErrorAC } from 'store/appReducer/actions'
import { ThunkType } from 'store/store'
import { setCardPacksTotalCountAC, setMaxCardsCountAC, setMinCardsCountAC, setPacksAC, setPageAC, setPageCountAC } from './actions'

export const getPacksTC = (changedPayload: ChangedPayloadType): ThunkType => async (dispatch, getState) => {
	const packs = getState().packs

	const payload: PayloadType = {
		packName: packs.packName,
		max: packs.maxCardsCount,
		min: packs.minCardsCount,
		page: packs.page,
		pageCount: packs.pageCount,
		sortPacks: packs.sortPacks,
		...changedPayload
	}

	try {
		dispatch(setIsLoadingAC(true))

		const response = await PACKS.getPacks(payload)
		const { cardPacks: packs, cardPacksTotalCount, page, pageCount, maxCardsCount, minCardsCount } = response.data

		dispatch(setCardPacksTotalCountAC(cardPacksTotalCount))
		dispatch(setPageAC(page))
		dispatch(setPageCountAC(pageCount))
		dispatch(setMaxCardsCountAC(changedPayload.max as number))
		dispatch(setMinCardsCountAC(changedPayload.min as number))
		dispatch(setPacksAC(packs))
	} catch (e: any) {
		const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
	} finally {
		dispatch(setIsLoadingAC(false))
	}
}
