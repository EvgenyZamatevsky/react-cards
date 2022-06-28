import { ThunkDispatch } from 'redux-thunk'
import { AppActionsType, RootReducerType } from 'store/store'

export type DispatchType = ThunkDispatch<RootReducerType, unknown, AppActionsType>
