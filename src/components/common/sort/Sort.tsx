import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { SortPropsType } from './types'
import { UniversalButton } from '../universalButton'
import { EMPTY_STRING } from 'constants/base'
import style from './Sort.module.scss'

export const Sort: FC<SortPropsType> =
	({
		sortValues,
		sortByDescending,
		sortByAscending,
		sortValue,
		isDisabled,
		handleSortByDescendingClick,
		handleSortByAscendingClick
	}): ReturnComponentType => {

		const sortValuesRender = sortValues.map((value, index) => {

			const onSortByDescendingClick = (): void => handleSortByDescendingClick(sortByDescending[index])

			const onSortByAscendingClick = (): void => handleSortByAscendingClick(sortByAscending[index])

			return (
				<div key={index}>
					{sortValue === sortByDescending[index]
						? <UniversalButton
							className={style.sortValueBtn}
							onClick={onSortByAscendingClick}
							disabled={isDisabled}
						>
							{value}
							<span className={sortValue === sortByDescending[index]
								? `${style.triangleDescending}`
								: EMPTY_STRING}>
							</span>
						</UniversalButton>
						: <UniversalButton
							className={style.sortValueBtn}
							onClick={onSortByDescendingClick}
							disabled={isDisabled}
						>
							{value}
							<span className={sortValue === sortByAscending[index]
								? `${style.triangleAscending}`
								: EMPTY_STRING}>
							</span>
						</UniversalButton>}
				</div>
			)
		})

		return (
			<>{sortValuesRender}</>
		)
	}
