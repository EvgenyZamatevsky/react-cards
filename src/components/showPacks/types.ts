import { URLSearchParamsInit } from 'react-router-dom'
import { SelectedPackType } from 'store/slices/packs/types'

export type ShowPacksPropsType = {
	selectedPack: SelectedPackType
	isDisabled: boolean
	setSearchParams: (nextInit: URLSearchParamsInit) => void
}
