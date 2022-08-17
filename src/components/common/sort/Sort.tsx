import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { SortValues } from './sortValues'
import style from './Sort.module.scss'
import { SortPropsType } from './types'

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
			return (
				<SortValues
					key={index}
					value={value}
					index={index}
					sortByDescending={sortByDescending}
					sortByAscending={sortByAscending}
					sortValue={sortValue}
					isDisabled={isDisabled}
					handleSortByDescendingClick={handleSortByDescendingClick}
					handleSortByAscendingClick={handleSortByAscendingClick}
				/>
			)
		})

		return (
			<>
				{sortValuesRender}
			</>
		)
	}
