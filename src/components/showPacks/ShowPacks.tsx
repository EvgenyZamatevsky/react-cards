import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'hooks'
import { selectIsDisabled } from 'store/selectors'
import { resetMinValueAndMaxValue, setSelectedPack } from 'store/slices'
import { ReturnComponentType } from 'types'
import { ShowPacksPropsType } from './types'
import style from './ShowPacks.module.scss'
import { UniversalButton } from 'components/common/universalButton'

export const ShowPacks: FC<ShowPacksPropsType> = ({ selectedPack }): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isDisabled = useSelector(selectIsDisabled)

	const onSelectMyPacksClick = (): void => {
		if (selectedPack !== 'My') {
			dispatch(setSelectedPack('My'))
			dispatch(resetMinValueAndMaxValue())
		}
	}

	const onSelectAllPacksClick = (): void => {
		if (selectedPack !== 'All') {
			dispatch(setSelectedPack('All'))
			dispatch(resetMinValueAndMaxValue())
		}
	}

	return (
		<div>
			<div className={style.showPacksCards}>Show packs cards</div>
			<UniversalButton
				className={`${style.myBtn} ${selectedPack === 'My' && style.active}`}
				onClick={onSelectMyPacksClick}
				disabled={isDisabled}
			>
				My
			</UniversalButton>
			<UniversalButton
				className={`${style.allBtn} ${selectedPack === 'All' && style.active}`}
				onClick={onSelectAllPacksClick}
				disabled={isDisabled}
			>
				All
			</UniversalButton>
		</div>
	)
}
