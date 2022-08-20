import { AnyAction } from '@reduxjs/toolkit'

export const isLoadingFulfilled = (action: AnyAction) => action.type.endsWith('fulfilled')

export const isLoadingRejected = (action: AnyAction) => action.type.endsWith('rejected')

export const isLoadingPending = (action: AnyAction) => action.type.endsWith('pending')

export const isDisabledFulfilled = (action: AnyAction) => {
	return action.type.endsWith('fulfilled')
		&& action.type !== 'packs/addPack/fulfilled'
		&& action.type !== 'packs/removePack/fulfilled'
		&& action.type !== 'packs/updatePackName/fulfilled'
		&& action.type !== 'cards/addCard/fulfilled'
		&& action.type !== 'cards/updateCard/fulfilled'
		&& action.type !== 'cards/removeCard/fulfilled'
}

export const isDisabledRejected = (action: AnyAction) => action.type.endsWith('rejected')

export const isDisabledPending = (action: AnyAction) => action.type.endsWith('pending')

export const isErrorRejected = (action: AnyAction) => {
	return action.type.endsWith('rejected') && action.type !== 'auth/getAuthorizedUserData/rejected'
}
