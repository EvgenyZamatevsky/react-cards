import { PackType } from 'api/packs/types'
import { addNewPackAC, deletePackAC, setCardPacksTotalCountAC, setMaxCardsCountAC, setMinCardsCountAC, setPacksAC, setPageAC, setPageCountAC, setSortPacksAC, updatePackAC } from './actions'

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
	ReturnType<typeof setMinCardsCountAC> |
	ReturnType<typeof setSortPacksAC> |
	ReturnType<typeof addNewPackAC> |
	ReturnType<typeof deletePackAC> |
	ReturnType<typeof updatePackAC> 
