export type SearchPropsType = {
	title?: string
	searchValue: string
	handleSetSearchValueChange: (value: string) => void
	handleResetSearchValueClick: (resetValue: string) => void
}
