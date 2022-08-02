import { PackType } from 'api/packs/types'

export type PacksSliceInitialStateType = {
	packs: PackType[],
	searchValue: string
	sortValue: string
	minValue: number
	maxValue: number
	minCardsCount: number
	maxCardsCount: number
	pageCount: number
}
