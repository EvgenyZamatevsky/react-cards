import { EMPTY_STRING } from 'constants/base'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/hooks'
import { selectSortValue } from 'store/selectors'
import { setSortValue } from 'store/slices/packs'
import { ReturnComponentType } from 'types'
import style from './SortValues.module.scss'

type SortValuesPropsType = {
	value: string
	index: number
}

const sortByAscending: string[] = ['1name', '1cardsCount', '1updated', '1user_name'] // По возрастанию
const sortByDescending: string[] = ['0name', '0cardsCount', '0updated', '0user_name'] // По убыванию

export const SortValues: FC<SortValuesPropsType> = ({ value, index }): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const sortValue = useSelector(selectSortValue)

	const onSortByAscendingClick = (): void => {// По возрастанию
		dispatch(setSortValue(sortByAscending[index]))
	}

	const onSortByDescendingClick = (): void => { // По убыванию
		dispatch(setSortValue(sortByDescending[index]))
	}

	return (
		<>
			{sortValue === sortByAscending[index]
				? <button
					className={style.sortValueBtn}
					onClick={onSortByDescendingClick}>
					{value}
					<span className={sortValue === sortByAscending[index]
						? `${style.triangleAscending}`
						: EMPTY_STRING}>
					</span>
				</button>
				: <button
					className={style.sortValueBtn}
					onClick={onSortByAscendingClick}>
					{value}
					<span className={sortValue === sortByDescending[index]
						? `${style.triangleDescending}`
						: EMPTY_STRING}>
					</span>
				</button>}
		</>
	)
}
