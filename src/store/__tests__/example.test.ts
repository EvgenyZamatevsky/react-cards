import exampleSlice,
{
	addItem,
	changeAnyValue,
	changeItemTitle,
	removeItem,
	setIsLoading,
	setSupplementedItems,
	toggleItemIsActive
} from 'store/slices/example'
import { ExampleSliceInitialStateType, FilterValue } from '../slices/example/types'

let startState: ExampleSliceInitialStateType

beforeEach(() => {
	startState = {
		isLoading: false,
		items: [
			{ id: 1, title: 'example', isActive: false, filter: FilterValue.ALL, isDisabled: false },
			{ id: 2, title: 'example2', isActive: false, filter: FilterValue.ALL, isDisabled: false },
		]
	}
})

test('isLoading should change its meaning', () => {

	const action = setIsLoading(true)

	const endState = exampleSlice(startState, action)

	expect(endState.isLoading).toBe(true)
})

test('', () => {

	const startState = { items: [], isLoading: false }

	const items = [
		{ id: 1, title: 'example', isActive: true, filter: FilterValue.ALL, isDisabled: false },
		{ id: 2, title: 'example2', isActive: false, filter: FilterValue.ALL, isDisabled: false },
	]

	const action = setSupplementedItems(items)

	const endState = exampleSlice(startState, action)

	expect(endState.items.length).toBe(2)
})

test('', () => {

	const item = { id: Date.now(), title: 'example3', isActive: true, filter: FilterValue.ALL, isDisabled: false }

	const action = addItem(item)

	const endState = exampleSlice(startState, action)

	expect(endState.items.length).toBe(3)
	expect(endState.items[0].title).toBe('example3')
})

test('', () => {

	const action = removeItem(1)

	const endState = exampleSlice(startState, action)

	expect(endState.items.length).toBe(1)
	expect(endState.items[0].id).toBe(2)
})

test('', () => {

	const action = changeItemTitle({ id: 1, title: 'newExample' })

	const endState = exampleSlice(startState, action)

	expect(endState.items.find(item => item.id === 1)?.title).toBe('newExample')
})

test('', () => {

	const action = changeAnyValue({ id: 1, domainPayload: { title: 'newExample', isActive: true } })

	const endState = exampleSlice(startState, action)

	expect(endState.items.find(item => item.id === 1)?.title).toBe('newExample')
	expect(endState.items.find(item => item.id === 1)?.isActive).toBe(true)
})

test('', () => {

	const action = toggleItemIsActive({ id: 1 })

	const endState = exampleSlice(startState, action)

	expect(endState.items.find(item => item.id === 1)?.isActive).toBe(true)
	expect(endState.items.find(item => item.id === 2)?.isActive).toBe(false)
})

// test('', () => {

// 	// const returnValue = null
// 	// const params = null

// 	// const action = asyncAction.fulfilled(returnValue, 'requestId', params)

// 	// const endState = appSlice(startState, action)

// 	// expect().toBe()
// })
