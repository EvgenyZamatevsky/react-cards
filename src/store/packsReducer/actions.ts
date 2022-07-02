import { PackType } from 'api/packs/types'

export const setPacksAC = (packs: PackType[]) => ({ type: 'packs/SET-PACKS', packs } as const)

export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
	({ type: 'packs/SET-CARDS-TOTAL-COUNT', cardPacksTotalCount } as const)

export const setPageAC = (page: number) => {
	return { type: 'packs/SET-PAGE', page } as const
}

export const setPageCountAC = (pageCount: number) => ({ type: 'packs/SET-PAGE-COUNT', pageCount } as const)

export const setMaxCardsCountAC = (maxCardsCount: number) => {
	return { type: 'packs/SET-MAX-CARDS-COUNT', maxCardsCount } as const
}

export const setMinCardsCountAC = (minCardsCount: number) => {

	return { type: 'packs/SET-MIN-CARDS-COUNT', minCardsCount } as const
}

