import { createAsyncThunk } from '@reduxjs/toolkit'
import { PACKS } from 'api'
import { PackType } from 'api/packs/types'
import { RootStateType } from 'store'

export const getPacks = createAsyncThunk
	<{ packs: PackType[], minCardsCount: number, maxCardsCount: number },
		{ packName: string, sortPacks: string, min: number, max: number, pageCount: number, page: number, userId?: string },
		{ rejectValue: { error: string } }>
	('packs/getPacks', async (params, { rejectWithValue }) => {
		try {
			const response = await PACKS.getPacks(params.packName, params.sortPacks, params.min, params.max, params.pageCount, params.page, params.userId)
			const { cardPacks: packs, minCardsCount, maxCardsCount } = response.data

			return { packs, minCardsCount, maxCardsCount }
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const addPack = createAsyncThunk
	<void,
		{ name: string, private: boolean },
		{ rejectValue: { error: string }, state: RootStateType }>
	('packs/addPack', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const packName = getState().packs.searchPackValue
			const sortPacks = getState().packs.sortValue
			const min = getState().packs.minValue
			const max = getState().packs.maxValue
			const pageCount = getState().packs.pageCount
			const page = getState().packs.page

			const response = await PACKS.addPack(params.name, params.private)
			dispatch(getPacks({ packName, sortPacks, min, max, pageCount, page }))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const removePack = createAsyncThunk
	<void, string, { rejectValue: { error: string }, state: RootStateType }>
	('packs/removePack', async (id, { rejectWithValue, dispatch, getState }) => {
		try {
			const packName = getState().packs.searchPackValue
			const sortPacks = getState().packs.sortValue
			const min = getState().packs.minValue
			const max = getState().packs.maxValue
			const pageCount = getState().packs.pageCount
			const page = getState().packs.page

			const response = await PACKS.removePack(id)
			dispatch(getPacks({ packName, sortPacks, min, max, pageCount, page }))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const updatePackName = createAsyncThunk
	<void, { _id: string, name: string }, { rejectValue: { error: string }, state: RootStateType }>
	('packs/updatePackName', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const packName = getState().packs.searchPackValue
			const sortPacks = getState().packs.sortValue
			const min = getState().packs.minValue
			const max = getState().packs.maxValue
			const pageCount = getState().packs.pageCount
			const page = getState().packs.page

			const response = await PACKS.updatePackName(params._id, params.name)
			dispatch(getPacks({ packName, sortPacks, min, max, pageCount, page }))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
