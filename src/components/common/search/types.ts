export type SearchPropsType = {
	searchValue: string
	isDisabled: boolean
	handleSetSearchValueChange: (value: string) => void
	handleResetSearchValueClick: (resetValue: string) => void
}
