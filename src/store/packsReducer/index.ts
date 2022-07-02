import { InitialStateType, PacksReducerActionsType } from './types'

const initialState: InitialStateType = {
	packs: [],
	cardPacksTotalCount: 11,
	page: 1,
	pageCount: 4,
	maxCardsCount: 110,
	minCardsCount: 0,
	sortPacks: '0name',
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

		default:
			return state
	}
}
