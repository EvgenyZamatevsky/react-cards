import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { asyncAction } from 'store/asyncActions'
import { isLoadingFulfilled, isLoadingPending, isLoadingRejected } from 'store/helpers'
import { ExampleSliceInitialStateType, FilterValue, ItemType } from './types'

const initialState: ExampleSliceInitialStateType = {
	isLoading: false,
	items: [
		// { id: 1, title: 'example', isActive: true, filter: FilterValue.ALL, isDisabled: false },
		// { id: 2, title: 'example2', isActive: false, filter: FilterValue.ALL, isDisabled: false },
	]
}

const exampleSlice = createSlice({
	name: 'example',
	initialState,
	reducers: {
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setSupplementedItems(state, action: PayloadAction<ItemType[]>) {
			state.items = action.payload.map(item => ({ ...item, isDisabled: false }))
		},
		addItem(state, action: PayloadAction<ItemType>) {
			state.items.unshift({ ...action.payload, isDisabled: false })
		},
		removeItem(state, action: PayloadAction<number>) {
			state.items = state.items.filter(item => item.id !== action.payload)
			// const index = state.items.findIndex(item => item.id === action.payload)
			// if (index > -1) {
			// 	state.items.splice(index, 1)
			// }
		},
		changeItemTitle(state, action: PayloadAction<{ id: number, title: string }>) {
			const item = state.items.find(item => item.id === action.payload.id)
			if (item) {
				item.title = action.payload.title
			}
			// const index = state.items.findIndex(item => item.id === action.payload.id)
			// if (index > -1) {
			// 	state.items[index].title = action.payload.title
			// }
		},
		changeAnyValue(state, action: PayloadAction<{ id: number, domainPayload: { title?: string, isActive?: boolean } }>) {
			const index = state.items.findIndex(item => item.id === action.payload.id)
			if (index > -1) {
				state.items[index] = { ...state.items[index], ...action.payload.domainPayload }
			}
		},
		toggleItemIsActive(state, action: PayloadAction<{ id: number }>) {
			const item = state.items.find(item => item.id === action.payload.id)
			if (item) {
				item.isActive = !item.isActive
			}
			// const index = state.items.findIndex(item => item.id === action.payload.id)
			// if (index > -1) {
			// 	state.items[index].isActive = !state.items[index].isActive
			// }
		},
	},
	extraReducers(builder) {
		builder
			.addCase(asyncAction.fulfilled, (state, action) => {

			})
			.addMatcher(isLoadingPending, (state) => {
				state.isLoading = true
			})
			.addMatcher(isLoadingFulfilled, (state) => {
				state.isLoading = false
			})
			.addMatcher(isLoadingRejected, (state) => {
				state.isLoading = false
			})
	},
})

export const {
	setIsLoading,
	setSupplementedItems,
	addItem, removeItem,
	changeItemTitle,
	changeAnyValue,
	toggleItemIsActive
} = exampleSlice.actions

export default exampleSlice.reducer
