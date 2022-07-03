import { ChangedPayloadType, PACKS, PayloadType } from 'api/packs'
import { CreatePackType, DataPacksType, UpdatePackType } from 'api/packs/types'
import { setIsLoadingAC, setErrorAC } from 'store/appReducer/actions'
import { ThunkType } from 'store/store'
import { addNewPackAC, deletePackAC, setCardPacksTotalCountAC, setMaxCardsCountAC, setMinCardsCountAC, setPacksAC, setPageAC, setPageCountAC, setSortPacksAC, updatePackAC } from './actions'

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
		dispatch(setMaxCardsCountAC(payload.max))
		dispatch(setMinCardsCountAC(payload.min))
		dispatch(setSortPacksAC(payload.sortPacks))
		dispatch(setPacksAC(packs))
	} catch (e: any) {
		const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
	} finally {
		dispatch(setIsLoadingAC(false))
	}
}

export const createPackTC = (cardsPack: DataPacksType<CreatePackType>): ThunkType => async (dispatch) => {
	try {
		dispatch(setIsLoadingAC(true))

		const response = await PACKS.createPack(cardsPack)
		const newCardsPack = response.data.newCardsPack

		dispatch(addNewPackAC(newCardsPack))

	} catch (e: any) {
		const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
	} finally {
		dispatch(setIsLoadingAC(false))
	}
}

export const deletePackTC = (packId: string): ThunkType => async (dispatch) => {
	try {
		dispatch(setIsLoadingAC(true))

		const response = await PACKS.deletePack(packId)

		dispatch(deletePackAC(packId))

	} catch (e: any) {
		const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
	} finally {
		dispatch(setIsLoadingAC(false))
	}
}

export const updatePackTC = (cardsPack: DataPacksType<UpdatePackType>): ThunkType => async (dispatch) => {
	try {
		dispatch(setIsLoadingAC(true))

		const response = await PACKS.updatePack(cardsPack)

		dispatch(updatePackAC(cardsPack.cardsPack._id, cardsPack.cardsPack.name))

	} catch (e: any) {
		const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
		dispatch(setErrorAC(error))
	} finally {
		dispatch(setIsLoadingAC(false))
	}
}
