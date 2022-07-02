import { instance } from 'api/config'

export const CARDS = {
	getCards() {
		return instance.get('cards/card')
	}
}
