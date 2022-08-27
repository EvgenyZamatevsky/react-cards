import { createAsyncThunk } from '@reduxjs/toolkit'
import { CARDS } from 'api'
import { CardType, PayloadType } from 'api/cards/types'
import { AxiosError } from 'axios'
import { RootStateType } from 'store'
import { handleServerNetworkError } from 'utils'

export const getCards = createAsyncThunk
	<
		{ cards: CardType[], cardsTotalCount: number, packUserId: string },
		{ packId: string, cardQuestion: string, sortCards: string, page: number, pageCount: number },
		{ rejectValue: { error: string } }
	>
	('cards/getCards', async (params, { rejectWithValue }) => {
		try {
			const response = await CARDS.getCards(
				params.packId,
				params.cardQuestion,
				params.sortCards,
				params.page,
				params.pageCount
			)
			const { cards, cardsTotalCount, packUserId } = response.data

			return { cards, cardsTotalCount, packUserId }
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})

export const addCard = createAsyncThunk
	<
		void,
		{ packId: string, question: string, answer: string },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('cards/addCard', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const sortCards = getState().cards.sortCards
			const searchCardValue = getState().cards.searchCardValue
			const page = getState().cards.page
			const pageCount = getState().cards.pageCount

			const response = await CARDS.addCard(params.packId, params.question, params.answer)

			dispatch(getCards({ packId: params.packId, cardQuestion: searchCardValue, sortCards, page, pageCount }))
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})

export const removeCard = createAsyncThunk
	<
		void,
		{ cardId: string, packId: string },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('cards/removeCard', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const sortCards = getState().cards.sortCards
			const searchCardValue = getState().cards.searchCardValue
			const page = getState().cards.page
			const pageCount = getState().cards.pageCount

			const response = await CARDS.removeCard(params.cardId)

			dispatch(getCards({ packId: params.packId, cardQuestion: searchCardValue, sortCards, page, pageCount }))
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})

export const updateCardQuestionOrAnswer = createAsyncThunk
	<
		void,
		{ packId: string, cardId: string, domainPayload: { question?: string, answer?: string } },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('cards/updateCard', async (params, { rejectWithValue, dispatch, getState }) => {
		try {
			const sortCards = getState().cards.sortCards
			const searchCardValue = getState().cards.searchCardValue
			const page = getState().cards.page
			const pageCount = getState().cards.pageCount

			const card = getState().cards.cards.find(card => card._id === params.cardId)

			const payload: PayloadType = {
				question: card?.question as string,
				answer: card?.answer as string,
				...params.domainPayload
			}

			const response = await CARDS.updateCardQuestionOrAnswer(params.cardId, payload)

			dispatch(getCards({ packId: params.packId, cardQuestion: searchCardValue, sortCards, page, pageCount }))
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})

export const updateCardGrade = createAsyncThunk
	<
		{ cardId: string, shots: number, grade: number },
		{ updatedGrade: number, cardId: string },
		{ rejectValue: { error: string }, state: RootStateType }
	>
	('cards/updateCardGrade', async (params, { rejectWithValue }) => {
		try {
			const response = await CARDS.updateCardGrade(params.cardId, params.updatedGrade)
			const { card_id: cardId, shots, grade } = response.data.updatedGrade

			return { cardId, shots, grade }
		} catch (error) {
			return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
		}
	})
