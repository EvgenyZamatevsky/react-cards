export type SortPropsType = {
	sortValues: string[]
	sortByDescending: string[]
	sortByAscending: string[]
	sortValue: string
	isDisabled: boolean
	handleSortByDescendingClick: (value: any) => void
	handleSortByAscendingClick: (value: any) => void
}
