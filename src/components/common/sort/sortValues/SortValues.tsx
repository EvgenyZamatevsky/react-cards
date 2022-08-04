import { EMPTY_STRING } from 'constants/base'
import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './SortValues.module.scss'

type SortValuesPropsType = {
	value: string
	index: number
	sortByDescending: string[]
	sortByAscending: string[]
	sortValue: string
	handleSortByDescendingClick: (value: any) => void
	handleSortByAscendingClick: (value: any) => void
}

export const SortValues: FC<SortValuesPropsType> =
	({ value, index, sortByDescending, sortByAscending, sortValue, handleSortByDescendingClick, handleSortByAscendingClick }): ReturnComponentType => {

		const onSortByDescendingClick = (): void => { // По убыванию
			handleSortByDescendingClick(sortByDescending[index])
		}

		const onSortByAscendingClick = (): void => {// По возрастанию
			handleSortByAscendingClick(sortByAscending[index])
		}

		return (
			<>
				{sortValue === sortByDescending[index]
					? <button
						className={style.sortValueBtn}
						onClick={onSortByAscendingClick}>
						{value}
						<span className={sortValue === sortByDescending[index]
							? `${style.triangleDescending}`
							: EMPTY_STRING}>
						</span>
					</button>
					: <button
						className={style.sortValueBtn}
						onClick={onSortByDescendingClick}>
						{value}
						<span className={sortValue === sortByAscending[index]
							? `${style.triangleAscending}`
							: EMPTY_STRING}>
						</span>
					</button>}
			</>
		)
	}
