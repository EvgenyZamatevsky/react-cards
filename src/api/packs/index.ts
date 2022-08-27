import { instance, instanceAdditional } from 'api/config'
import { EMPTY_STRING } from 'constants/base'
import { PacksResponseType } from './types'

export const PACKS = {
	getPacks(packName: string, sortPacks: string, min: number, max: number, pageCount: number, page: number, userId: string) {
		return instanceAdditional.get<PacksResponseType>(`cards/pack`, {
			params: {
				pageCount,
				page,
				sortPacks,
				min,
				max,
				...packName === EMPTY_STRING ? EMPTY_STRING : { packName },
				...userId === EMPTY_STRING ? EMPTY_STRING : { user_id: userId }
			}
		})
	},
	addPack(packName: string, isPackPrivate: boolean) {
		return instanceAdditional.post(`cards/pack`, {
			cardsPack: {
				name: packName,
				private: isPackPrivate,
				deckCover: 'https://i1.sndcdn.com/avatars-000064006708-xvoch7-t500x500.jpg'
			}
		})
	},
	removePack(packId: string) {
		return instanceAdditional.delete(`cards/pack?id=${packId}`)
	},
	updatePackName(packId: string, updatedPackName: string) {
		return instanceAdditional.put(`cards/pack`, {
			cardsPack: {
				_id: packId,
				name: updatedPackName,
				deckCover: 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg'
			}
		})
	},
}
