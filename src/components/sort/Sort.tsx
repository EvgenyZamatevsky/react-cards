import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Sort.module.scss'
import { SortValues } from './sortValues'

type SortPropsType = {

}

const sortValues: string[] = ['Name', 'Cards', 'Last Updated', 'Created by']

export const Sort: FC<SortPropsType> = (): ReturnComponentType => {

	const sortValuesRender = sortValues.map((value, index) => {
		return <SortValues key={index} value={value} index={index} />
	})

	return (
		<div className={style.sort}>
			{sortValuesRender}
			<div className={style.actions}>Actions</div>
		</div>
	)
}
