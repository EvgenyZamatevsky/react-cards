import { DoubleRange } from 'components/common'
import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/hooks'
import { selectMaxCardsCount, selectMaxValue, selectMinCardsCount, selectMinValue } from 'store/selectors'
import { setMaxAndMinValue } from 'store/slices/packs'
import { ReturnComponentType } from 'types'
import style from './NavBar.module.scss'

type NavBarPropsType = {

}

export const NavBar: FC<NavBarPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const minValue = useSelector(selectMinValue)
	const maxValue = useSelector(selectMaxValue)

	const maxCardsCount = useSelector(selectMaxCardsCount)
	const minCardsCount = useSelector(selectMinCardsCount)

	const handleSetMinAndMaxValueMouseUp = useCallback(({ min, max }: { min: number, max: number }) => {
		dispatch(setMaxAndMinValue({ max: max, min: min }))
	}, [])

	return (
		<div className={style.navBar}>
			<div className={style.content}>
				<h2 className={style.title}>Show packs cards</h2>
				<div className={style.buttons}>
					<button className={style.myBtn}>My</button>
					<button className={style.allBth}>All</button>
				</div>
			</div>
			<div className={style.bottom}>
				<div className={style.text}>Number of cards</div>
				<DoubleRange
					max={maxValue}
					min={minValue}
					maxDefaultValue={maxCardsCount}
					minDefaultValue={minCardsCount}
					onSetMinAndMaxValueMouseUp={handleSetMinAndMaxValueMouseUp}
				/>
			</div>
			<button className={style.resetBtn}>Reset filters</button>
		</div>
	)
}
