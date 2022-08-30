import { getCards } from 'store/asyncActions'
import cardsSlice, { setCardPage, setCardPageCount, setSearchCardValue, setSortCards } from 'store/slices/cards'
import { CardsSliceInitialStateType } from 'store/slices/cards/types'

let startState: CardsSliceInitialStateType

beforeEach(() => {
	startState = {
		cards: [],
		searchCardValue: '',
		sortCards: '0updated',
		page: 1,
		pageCount: 5,
		cardsTotalCount: 0,
		packUserId: ''
	}
})

test('must find the right cards', (() => {
	const endState = cardsSlice(startState, setSearchCardValue('my cards'))

	expect(endState.searchCardValue).toBe('my cards')
}))

test('cards should be sorted correctly', (() => {
	const endState = cardsSlice(startState, setSortCards('0name'))

	expect(endState.sortCards).toBe('0name')
}))

test('you need to select the correct map page', (() => {
	const endState = cardsSlice(startState, setCardPage(10))

	expect(endState.page).toBe(10)
}))

test('the required number of cards should be displayed', (() => {
	const endState = cardsSlice(startState, setCardPageCount(100))

	expect(endState.pageCount).toBe(100)
}))

test('data received from the server should be set to state', () => {

	const returnedData = {
		cards: [
			{
				_id: '1',
				cardsPack_id: '1',
				user_id: '1',
				answer: '66',
				question: 'how old are you?',
				grade: 0,
				shots: 0,
				questionImg: '',
				answerImg: '',
				answerVideo: '',
				questionVideo: '',
				comments: '',
				type: '',
				rating: 1,
				more_id: '1',
				created: '' as unknown as Date,
				updated: '' as unknown as Date,
				__v: 1,
			}
		],
		cardsTotalCount: 666,
		packUserId: '1'
	}

	const params = {
		packId: '1',
		cardQuestion: 'how old are you?',
		sortCards: '0update',
		page: 1,
		pageCount: 5
	}

	const action = getCards.fulfilled(returnedData, 'requestId', params)

	const endState = cardsSlice(startState, action)

	expect(endState.cards).toBe(returnedData.cards)
	expect(endState.cardsTotalCount).toBe(returnedData.cardsTotalCount)
	expect(endState.packUserId).toBe(returnedData.packUserId)
})
