import { createAsyncThunk } from '@reduxjs/toolkit'
import { PACKS } from 'api'
import { PackType } from 'api/packs/types'
import { AxiosError } from 'axios'
import { EMPTY_STRING } from 'constants/base'
import { RootStateType } from 'store'
import { handleServerNetworkError } from 'utils'

export const getPacks = createAsyncThunk
	<
		{ packs: PackType[], minCardsCount: number, maxCardsCount: number, packsTotalCount: number },
		{ packName: string, sortPacks: string, min: number, max: number, pageCount: number, page: number, userId: string },
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
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})

export const addPack = createAsyncThunk
	<
		void,
		{ authorizedUserId: string, packName: string, isPackPrivate: boolean },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('packs/addPack', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const searchPackValue = getState().packs.searchPackValue
			const sortPacks = getState().packs.sortPacks
			const minValue = getState().packs.minValue
			const maxValue = getState().packs.maxValue
			const pageCount = getState().packs.pageCount
			const page = getState().packs.page

			const response = await PACKS.addPack(params.packName, params.isPackPrivate)

			dispatch(getPacks({
				packName: searchPackValue,
				sortPacks,
				min: minValue,
				max: maxValue,
				pageCount,
				page,
				userId: params.authorizedUserId
			}))
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})

export const removePack = createAsyncThunk
	<
		void,
		{ packId: string, authorizedUserId: string },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('packs/removePack', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const searchPackValue = getState().packs.searchPackValue
			const sortPacks = getState().packs.sortPacks
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
				userId: params.authorizedUserId
			}))
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})

export const updatePackName = createAsyncThunk
	<
		void,
		{ authorizedUserId: string, packId: string, updatedPackName: string },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('packs/updatePackName', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const searchPackValue = getState().packs.searchPackValue
			const sortPacks = getState().packs.sortPacks
			const minValue = getState().packs.minValue
			const maxValue = getState().packs.maxValue
			const pageCount = getState().packs.pageCount
			const page = getState().packs.page

			const response = await PACKS.updatePackName(params.packId, params.updatedPackName)

			dispatch(getPacks({
				packName: searchPackValue,
				sortPacks,
				min: minValue,
				max: maxValue,
				pageCount,
				page,
				userId: params.authorizedUserId
			}))
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})
