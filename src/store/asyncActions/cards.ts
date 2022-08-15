import { createAsyncThunk } from '@reduxjs/toolkit'
import { CARDS } from 'api'
import { CardType } from 'api/cards/types'
import { RootStateType } from 'store'

export const getCards = createAsyncThunk
	<{ cards: CardType[], cardsTotalCount: number },
		{ packId: string, cardQuestion: string, sortCards: string, page: number, pageCount: number },
		{ rejectValue: { error: string } }>
	('cards/getCards', async (params, { rejectWithValue }) => {
		try {
			const response = await CARDS.getCards(
				params.packId, params.cardQuestion, params.sortCards, params.page, params.pageCount)
			const { cards, cardsTotalCount } = response.data

			return { cards, cardsTotalCount }
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const addCard = createAsyncThunk
	<void,
		{ packId: string, question: string, answer: string },
		{ rejectValue: { error: string }, state: RootStateType }>
	('cards/addCard', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const sortCards = getState().cards.sortCards
			const cardQuestion = getState().cards.searchCardValue
			const page = getState().cards.page
			const pageCount = getState().cards.pageCount

			const response = await CARDS.addCard(params.packId, params.question, params.answer)
			dispatch(getCards({ packId: params.packId, cardQuestion, sortCards, page, pageCount }))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const removeCard = createAsyncThunk
	<void,
		{ cardId: string, packId: string },
		{ rejectValue: { error: string }, state: RootStateType }>
	('cards/removeCard', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const sortCards = getState().cards.sortCards
			const cardQuestion = getState().cards.searchCardValue
			const page = getState().cards.page
			const pageCount = getState().cards.pageCount

			const response = await CARDS.removeCard(params.cardId)
			dispatch(getCards({ packId: params.packId, cardQuestion, sortCards, page, pageCount }))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const updateCard = createAsyncThunk
	<void,
		{ packId: string, cardId: string, question: string, answer: string },
		{ rejectValue: { error: string }, state: RootStateType }>
	('cards/updateCard', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const sortCards = getState().cards.sortCards
			const cardQuestion = getState().cards.searchCardValue
			const page = getState().cards.page
			const pageCount = getState().cards.pageCount

			const response = await CARDS.updateCard(params.cardId, params.question, params.answer)
			dispatch(getCards({ packId: params.packId, cardQuestion, sortCards, page, pageCount }))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})
