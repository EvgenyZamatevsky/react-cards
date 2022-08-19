import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { GradePropsType } from './types'
import style from './Grade.module.scss'

export const Grade: FC<GradePropsType> = ({ grade, index, setGradeIndex }): ReturnComponentType => {

	const onGradeChange = (): void => setGradeIndex(index + 1)

	return (
		<div className={style.container}>
			<input
				type='radio'
				name='grade'
				value={grade}
				onChange={onGradeChange}
			/>
			<div className={style.grade}>{grade}</div>
		</div>
	)
}
