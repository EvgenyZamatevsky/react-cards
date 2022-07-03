import { instance } from 'api/config'
import { createPackResponseType, CreatePackType, DataPacksType, PacksResponseType, UpdatePackType } from './types'

export const PACKS = {
	getPacks(payload: PayloadType) {

		return instance.get<PacksResponseType>('cards/pack', {
			params: {
				packName: payload.packName,
				page: payload.page,
				pageCount: payload.pageCount,
				min: payload.min,
				max: payload.max,
				sortPacks: payload.sortPacks
			}
		})
	},
	createPack(dataPack: DataPacksType<CreatePackType>) {
		return instance.post<createPackResponseType>('cards/pack', dataPack)
	},
	deletePack(id: string) {
		return instance.delete(`cards/pack?id=${id}`)
	},
	updatePack(dataPack: DataPacksType<UpdatePackType>) {
		return instance.put('cards/pack', dataPack)
	}
}

export type PayloadType = {
	packName: string
	page: number
	pageCount: number
	min: number
	max: number
	sortPacks: string
}

export type ChangedPayloadType = {
	packName?: string
	page?: number
	pageCount?: number
	min?: number
	max?: number
	sortPacks?: string
	cardPacksTotalCount?: number
	minCardsCount?: number
	maxCardsCount?: number
}