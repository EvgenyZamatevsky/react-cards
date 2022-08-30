import { getPacks, logOut } from 'store/asyncActions'
import packsSlice,
{
	resetMinValueAndMaxValue,
	setMaxValue,
	setMinValue,
	setPackPage,
	setPackPageCount,
	setSearchPackValue,
	setSelectedPack,
	setSortPacks
} from 'store/slices/packs'
import { PacksSliceInitialStateType } from 'store/slices/packs/types'

let startState: PacksSliceInitialStateType

beforeEach(() => {
	startState = {
		packs: [],
		searchPackValue: '',
		sortPacks: '0updated',
		minCardsCount: 0,
		maxCardsCount: 110,
		minValue: 0,
		maxValue: 110,
		pageCount: 5,
		page: 1,
		packsTotalCount: 0,
		selectedPack: 'All'
	}
})

test('must find the right packs', (() => {
	const endState = packsSlice(startState, setSearchPackValue('my packs'))

	expect(endState.searchPackValue).toBe('my packs')
}))

test('packs should be sorted correctly', (() => {
	const endState = packsSlice(startState, setSortPacks('1updated'))

	expect(endState.sortPacks).toBe('1updated')
}))

test('the max value must be correctly set', (() => {
	const endState = packsSlice(startState, setMaxValue(50))

	expect(endState.maxValue).toBe(50)
}))

test('the min value must be correctly set', (() => {
	const endState = packsSlice(startState, setMinValue(10))

	expect(endState.minValue).toBe(10)
}))

test('property selectedPack must be changed', (() => {
	const endState = packsSlice(startState, setSelectedPack('My'))

	expect(endState.selectedPack).toBe('My')
}))

test('the correct pack page must be selected', (() => {
	const endState = packsSlice(startState, setPackPage(3))

	expect(endState.page).toBe(3)
}))

test('the required number of packs should be displayed', (() => {
	const endState = packsSlice(startState, setPackPageCount(50))

	expect(endState.pageCount).toBe(50)
}))

test('min value and max value should reset', (() => {
	const endState = packsSlice(startState, resetMinValueAndMaxValue())

	expect(endState.minValue).toBe(0)
	expect(endState.maxValue).toBe(110)
}))

test('data received from the server should be set to state', () => {

	const returnedData = {
		packs: [
			{
				_id: '1',
				user_id: '1',
				user_name: 'user name',
				private: false,
				name: 'Maria',
				path: '/path',
				grade: 0,
				shots: 0,
				cardsCount: 23,
				type: '',
				rating: 0,
				created: '' as unknown as Date,
				updated: '' as unknown as Date,
				more_id: '1',
				__v: 1,
				deckCover: ''
			}
		],
		minCardsCount: 10,
		maxCardsCount: 120,
		packsTotalCount: 1321
	}

	const params = {
		packName: 'Maria',
		sortPacks: '1name',
		min: 2,
		max: 44,
		pageCount: 11,
		page: 2,
		userId: '1'
	}

	const action = getPacks.fulfilled(returnedData, 'requestId', params)

	const endState = packsSlice(startState, action)

	expect(endState.packs).toBe(returnedData.packs)
	expect(endState.maxCardsCount).toBe(returnedData.maxCardsCount)
	expect(endState.minCardsCount).toBe(returnedData.minCardsCount)
	expect(endState.packsTotalCount).toBe(returnedData.packsTotalCount)
})

test('all data in the state must be reset', () => {

	const action = logOut.fulfilled(undefined, 'requestId', undefined)

	const endState = packsSlice(startState, action)

	expect(endState.packs).toEqual([])
	expect(endState.searchPackValue).toBe('')
	expect(endState.sortPacks).toBe('0updated')
	expect(endState.minValue).toBe(0)
	expect(endState.maxValue).toBe(110)
	expect(endState.minCardsCount).toBe(0)
	expect(endState.maxCardsCount).toBe(110)
	expect(endState.pageCount).toBe(5)
	expect(endState.page).toBe(1)
	expect(endState.packsTotalCount).toBe(0)
	expect(endState.selectedPack).toBe('All')
})
