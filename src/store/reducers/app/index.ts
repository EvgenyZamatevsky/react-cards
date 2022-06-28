import { InitialStateType, AppReducerActionsType } from './types'

const initialState: InitialStateType = {

}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
	switch (action.type) {

		default:
			return state
	}
}
