import { DoubleRange } from 'components/common/DoubleRange/DoubleRange'
import { useTypedDispatch } from 'hooks'
import React, { FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { setMaxCardsCountAC, setMinCardsCountAC } from 'store/packsReducer/actions'
import { selectMaxCardsCount, selectMinCardsCount } from 'store/packsReducer/selectors'
import { getPacksTC } from 'store/packsReducer/thunks'
import { ReturnComponentType } from 'types'
import style from './PackNavBar.module.scss'

export type PackNavBarPropsType = {

}

export const PackNavBar: FC<PackNavBarPropsType> = (): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const minCardsCount = useSelector(selectMinCardsCount)
	const maxCardsCount = useSelector(selectMaxCardsCount)

	const handleChangedCardsCountMouseUp = useCallback(({ min, max }: { min: number, max: number }) => {
		dispatch(getPacksTC({ min, max }))
	}, [])

	return (
		<div className={style.navbar}>
			<div className={style.title}>Show packs cards</div>
			<div className={style.showPacks}>
				<button className={style.my}>My</button>
				<button className={style.all}>All</button>
			</div>
			<div className={style.text}>Numbers of cards</div>
			<DoubleRange
				handleChangedCardsCountMouseUp={handleChangedCardsCountMouseUp}
				min={minCardsCount}
				max={maxCardsCount}
			/>
		</div>
	)
}
