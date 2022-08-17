export type SortValuesPropsType = {
	value: string
	index: number
	sortByDescending: string[]
	sortByAscending: string[]
	sortValue: string
	isDisabled: boolean
	handleSortByDescendingClick: (value: string) => void
	handleSortByAscendingClick: (value: string) => void
}
