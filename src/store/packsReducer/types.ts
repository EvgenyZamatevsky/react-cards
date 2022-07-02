import { PackType } from 'api/packs/types'
import { setCardPacksTotalCountAC, setMaxCardsCountAC, setMinCardsCountAC, setPacksAC, setPageAC, setPageCountAC } from './actions'

export type InitialStateType = {
	packs: PackType[]
	cardPacksTotalCount: number
	page: number
	pageCount: number
	maxCardsCount: number
	minCardsCount: number
	sortPacks: string
	packName: string
}

export type PacksReducerActionsType =
	ReturnType<typeof setPacksAC> |
	ReturnType<typeof setCardPacksTotalCountAC> |
	ReturnType<typeof setPageAC> |
	ReturnType<typeof setPageCountAC> |
	ReturnType<typeof setMaxCardsCountAC> |
	ReturnType<typeof setMinCardsCountAC>

