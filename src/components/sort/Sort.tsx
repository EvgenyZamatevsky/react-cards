import React, { FC } from 'react'
import { EMPTY_STRING } from 'constants/base'
import { ReturnComponentType } from 'types'
import { SortPropsType } from './types'
import style from './Sort.module.scss'

export const Sort: FC<SortPropsType> =
	({
		sortValues,
		sortByDescending,
		sortByAscending,
		sortValue,
		handleSortByDescendingClick,
		handleSortByAscendingClick,
	}): ReturnComponentType => {

		const sortValuesRender = sortValues.map((value, index) => {

			const onSortByDescendingClick = (): void => handleSortByDescendingClick(sortByDescending[index])

			const onSortByAscendingClick = (): void => handleSortByAscendingClick(sortByAscending[index])

			return (
				<th key={index} className={style.th}>
					{sortValue === sortByDescending[index]
						? <button
							className={style.sortValueBtn}
							onClick={onSortByAscendingClick}
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
						>
							{value}
							<span className={sortValue === sortByAscending[index]
								? `${style.triangleAscending}`
								: EMPTY_STRING}>
							</span>
						</button>}
				</th>
			)
		})

		return (
			<>{sortValuesRender}</>
		)
	}
