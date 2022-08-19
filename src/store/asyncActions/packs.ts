import { createAsyncThunk } from '@reduxjs/toolkit'
import { PACKS } from 'api'
import { PackType } from 'api/packs/types'
import { EMPTY_STRING } from 'constants/base'
import { RootStateType } from 'store'

export const getPacks = createAsyncThunk
	<
		{ packs: PackType[], minCardsCount: number, maxCardsCount: number, packsTotalCount: number },
		{ packName: string, sortPacks: string, min: number, max: number, pageCount: number, page: number, userId?: string },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('packs/getPacks', async (params, { rejectWithValue, getState }) => {
		try {
			const selectedPack = getState().packs.selectedPack

			const response = await PACKS.getPacks(
				params.packName,
				params.sortPacks,
				params.min,
				params.max,
				params.pageCount,
				params.page,
				selectedPack === 'My' ? params.userId : EMPTY_STRING
			)
			const { cardPacks: packs, minCardsCount, maxCardsCount, cardPacksTotalCount: packsTotalCount } = response.data

			return { packs, minCardsCount, maxCardsCount, packsTotalCount }
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const addPack = createAsyncThunk
	<
		void,
		{ userId: string, name: string, private: boolean },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('packs/addPack', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const searchPackValue = getState().packs.searchPackValue
			const sortPacks = getState().packs.sortValue
			const minValue = getState().packs.minValue
			const maxValue = getState().packs.maxValue
			const pageCount = getState().packs.pageCount
			const page = getState().packs.page

			const response = await PACKS.addPack(params.name, params.private)

			dispatch(getPacks({
				packName: searchPackValue,
				sortPacks,
				min: minValue,
				max: maxValue,
				pageCount,
				page,
				userId: params.userId
			}))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const removePack = createAsyncThunk
	<void, { packId: string, userId: string }, { rejectValue: { error: string }, state: RootStateType }>
	('packs/removePack', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const searchPackValue = getState().packs.searchPackValue
			const sortPacks = getState().packs.sortValue
			const minValue = getState().packs.minValue
			const maxValue = getState().packs.maxValue
			const pageCount = getState().packs.pageCount
			const page = getState().packs.page

			const response = await PACKS.removePack(params.packId)

			dispatch(getPacks({
				packName: searchPackValue,
				sortPacks,
				min: minValue,
				max: maxValue,
				pageCount,
				page,
				userId: params.userId
			}))

		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const updatePackName = createAsyncThunk
	<void, { userId: string, packId: string, packName: string }, { rejectValue: { error: string }, state: RootStateType }>
	('packs/updatePackName', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const searchPackValue = getState().packs.searchPackValue
			const sortPacks = getState().packs.sortValue
			const minValue = getState().packs.minValue
			const maxValue = getState().packs.maxValue
			const pageCount = getState().packs.pageCount
			const page = getState().packs.page

			const response = await PACKS.updatePackName(params.packId, params.packName)

			dispatch(getPacks({
				packName: searchPackValue,
				sortPacks,
				min: minValue,
				max: maxValue,
				pageCount,
				page,
				userId: params.userId
			}))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
