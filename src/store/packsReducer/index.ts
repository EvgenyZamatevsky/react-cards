import { PackType } from 'api/packs/types'
import { InitialStateType, PacksReducerActionsType } from './types'

const initialState: InitialStateType = {
	packs: [],
	cardPacksTotalCount: 11,
	page: 1,
	pageCount: 8,
	maxCardsCount: 110,
	minCardsCount: 0,
	sortPacks: '',
	packName: ''
}

export const packsReducer = (state: InitialStateType = initialState, action: PacksReducerActionsType): InitialStateType => {

	switch (action.type) {
		case 'packs/SET-PACKS':
			return { ...state, packs: action.packs }
		case 'packs/SET-CARDS-TOTAL-COUNT':
			return { ...state, cardPacksTotalCount: action.cardPacksTotalCount }
		case 'packs/SET-PAGE':
			return { ...state, page: action.page }
		case 'packs/SET-PAGE-COUNT':
			return { ...state, pageCount: action.pageCount }
		case 'packs/SET-MAX-CARDS-COUNT':
			return { ...state, maxCardsCount: action.maxCardsCount }
		case 'packs/SET-MIN-CARDS-COUNT':
			return { ...state, minCardsCount: action.minCardsCount }
		case 'packs/SET-SORT-PACKS':
			return { ...state, sortPacks: action.sortValue }
		case 'packs/ADD-NEW-PACK':
			return { ...state, packs: [action.newPack, ...state.packs] }
		case 'packs/DELETE-PACK':
			return { ...state, packs: state.packs.filter(pack => pack._id !== action.packId) }
		case 'packs/UPDATE-PACK':
			return { ...state, packs: state.packs.map(pack => pack._id === action.packId ? { ...pack, name: action.newName } : pack) as PackType[] }

		default:
			return state
	}
}
