import React, { FC } from 'react'
import { EMPTY_STRING } from 'constants/base'
import { ReturnComponentType } from 'types'
import style from './SortValues.module.scss'

type SortValuesPropsType = {
	value: string
	index: number
	sortByDescending: string[]
	sortByAscending: string[]
	sortValue: string
	isDisabled: boolean
	handleSortByDescendingClick: (value: any) => void
	handleSortByAscendingClick: (value: any) => void
}

export const SortValues: FC<SortValuesPropsType> =
	({
		value,
		index,
		sortByDescending,
		sortByAscending,
		sortValue,
		isDisabled,
		handleSortByDescendingClick,
		handleSortByAscendingClick
	}): ReturnComponentType => {

		const onSortByDescendingClick = (): void => handleSortByDescendingClick(sortByDescending[index])

		const onSortByAscendingClick = (): void => handleSortByAscendingClick(sortByAscending[index])

		return (
			<>
				{sortValue === sortByDescending[index]
					? <button
						className={style.sortValueBtn}
						onClick={onSortByAscendingClick}
						disabled={isDisabled}
					>
						{value}
						<span className={sortValue === sortByDescending[index]
							? `${style.triangleDescending}`
							: EMPTY_STRING}>
						</span>
					</button>
					: <button
						className={style.sortValueBtn}
						onClick={onSortByDescendingClick}
						disabled={isDisabled}
					>
						{value}
						<span className={sortValue === sortByAscending[index]
							? `${style.triangleAscending}`
							: EMPTY_STRING}>
						</span>
					</button>}
			</>
		)
	}
