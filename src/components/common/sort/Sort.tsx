import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { SortValues } from './sortValues'
import style from './Sort.module.scss'

type SortPropsType = {
	sortValues: string[]
	sortByDescending: string[]
	sortByAscending: string[]
	sortValue: string
	handleSortByDescendingClick: (value: any) => void
	handleSortByAscendingClick: (value: any) => void
}

export const Sort: FC<SortPropsType> =
	({ sortValues, sortByDescending, sortByAscending, sortValue, handleSortByDescendingClick, handleSortByAscendingClick }): ReturnComponentType => {

		const sortValuesRender = sortValues.map((value, index) => {
			return (
				<SortValues
					key={index}
					value={value}
					index={index}
					sortByDescending={sortByDescending}
					sortByAscending={sortByAscending}
					sortValue={sortValue}
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
