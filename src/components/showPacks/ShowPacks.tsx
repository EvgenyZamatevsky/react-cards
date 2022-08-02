import React, { FC } from 'react'
import { useAppDispatch } from 'store/hooks'
import { setSelectedPack } from 'store/slices'
import { SelectedPackType } from 'store/slices/packs/types'
import { ReturnComponentType } from 'types'
import style from './ShowPacks.module.scss'

type ShowPacksPropsType = {
	selectedPack: SelectedPackType
}

export const ShowPacks: FC<ShowPacksPropsType> = ({ selectedPack }): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const onSelectMyPacksClick = (): void => {
		if (selectedPack !== 'My') {
			dispatch(setSelectedPack('My'))
		}
	}

	const onSelectAllPacksClick = (): void => {
		if (selectedPack !== 'All') {
			dispatch(setSelectedPack('All'))
		}
	}

	return (
		<div>
			<div className={style.showPacksCards}>Show packs cards</div>
			<div className={style.showPacksButtons}>
				<button
					className={`${style.myBtn} ${selectedPack === 'My' && style.active}`}
					onClick={onSelectMyPacksClick}>
					My
				</button>
				<button
					className={`${style.allBtn} ${selectedPack === 'All' && style.active}`}
					onClick={onSelectAllPacksClick}>
					All
				</button>
			</div>
		</div>
	)
}
