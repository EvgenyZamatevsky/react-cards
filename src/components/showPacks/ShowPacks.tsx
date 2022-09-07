import React, { FC, memo } from 'react'
import { useAppDispatch } from 'hooks'
import { resetMinValueAndMaxValue } from 'store/slices'
import { ReturnComponentType } from 'types'
import { ShowPacksPropsType } from './types'
import { UniversalButton } from 'components/common/universalButton'
import style from './ShowPacks.module.scss'

export const ShowPacks: FC<ShowPacksPropsType> = memo(({ selectedPack, isDisabled, setSearchParams }): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const onSelectMyPacksClick = (): void => {
		if (selectedPack !== 'My') {
			setSearchParams({ showPacks: 'My' })
			dispatch(resetMinValueAndMaxValue())
		}
	}

	const onSelectAllPacksClick = (): void => {
		if (selectedPack !== 'All') {
			setSearchParams({ showPacks: 'All' })
			dispatch(resetMinValueAndMaxValue())
		}
	}

	return (
		<>
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
		</>
	)
})
