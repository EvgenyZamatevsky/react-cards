import { PackType } from 'api/packs/types'

export type PacksSliceInitialStateType = {
	packs: PackType[],
	searchPackValue: string
	sortPacks: string
	minValue: number
	maxValue: number
	minCardsCount: number
	maxCardsCount: number
	pageCount: number,
	page: number
	packsTotalCount: number
	selectedPack: SelectedPackType
}

export type SelectedPackType = 'My' | 'All'
