export type PaginationPropsType = {
	totalItemsCount: number,
	pageCount: number
	page: number
	handleSetPageClick: (page: number) => void
	handleSetPageCountChange: (pageCount: number) => void
	portionSize?: number
}

export type PageCountValueType = {
	value: string
	count: number
}
