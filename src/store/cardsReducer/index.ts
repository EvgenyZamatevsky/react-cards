import { InitialStateType, CardsReducerActionsType } from './types'

const initialState: InitialStateType = {
	cards: []
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionsType): InitialStateType => {
	switch (action.type) {
		case 'cards/SET-CARDS':
			return { ...state, cards: action.cards }

		default:
			return state
	}
}
