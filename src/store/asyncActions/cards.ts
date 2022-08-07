import { createAsyncThunk } from '@reduxjs/toolkit'
import { CARDS } from 'api'
import { CardType } from 'api/cards/types'
import { RootStateType } from 'store'

export const getCards = createAsyncThunk
	<{ cards: CardType[] },
		{ packId: string, cardQuestion: string, sortCards: string },
		{ rejectValue: { error: string } }>
	('cards/getCards', async (params, { rejectWithValue }) => {
		try {
			const response = await CARDS.getCards(params.packId, params.cardQuestion, params.sortCards)
			const { cards } = response.data

			return { cards }
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

			const response = await CARDS.addCard(params.packId, params.question, params.answer)
			dispatch(getCards({ packId: params.packId, cardQuestion, sortCards }))
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

			const response = await CARDS.removeCard(params.cardId)
			dispatch(getCards({ packId: params.packId, cardQuestion, sortCards }))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})

export const updateCardQuestion = createAsyncThunk
	<void,
		{ packId: string, cardId: string, question: string },
		{ rejectValue: { error: string }, state: RootStateType }>
	('cards/updateCardQuestion', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const sortCards = getState().cards.sortCards
			const cardQuestion = getState().cards.searchCardValue

			const response = await CARDS.updateCardQuestion(params.cardId, params.question)
			dispatch(getCards({ packId: params.packId, cardQuestion, sortCards }))
		} catch (e: any) {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			return rejectWithValue({ error })
		}
	})