import { PackType } from 'api/packs/types'

export type PacksSliceInitialStateType = {
	packs: PackType[],
	searchValue: string
	sortValue: string
}
