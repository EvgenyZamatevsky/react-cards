import React, { FC, memo } from 'react'
import { ReturnComponentType } from 'types'
import { RatingPropsType } from './types'
import style from './Rating.module.scss'

export const Rating: FC<RatingPropsType> = memo(({ grade }): ReturnComponentType => {

	const currentRating = grade / 0.05

	return (
		<div className={style.rating}>

			<div className={style.active} style={{ width: `${currentRating}%` }}></div>

		</div>
	)
})
