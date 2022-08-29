import { EMPTY_STRING } from 'constants/base'
import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Head.module.scss'

type HeadPropsType = {
	sortValues: string[]
	sortByDescending: string[]
	sortByAscending: string[]
	sortValue: string
	handleSortByDescendingClick: (value: string) => void
	handleSortByAscendingClick: (value: string) => void
}

export const Head: FC<HeadPropsType> =
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
			<thead className={style.thead}>
				<tr className={style.tr}>
					{sortValuesRender}
					<th className={style.th}>Actions</th>
				</tr>
			</thead>
		)
	}
