export type SortPropsType = {
	sortValues: string[]
	sortByDescending: string[]
	sortByAscending: string[]
	sortValue: string
	isDisabled: boolean
	handleSortByDescendingClick: (value: string) => void
	handleSortByAscendingClick: (value: string) => void
}
