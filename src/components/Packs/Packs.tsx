import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Packs.module.scss'

export type PacksPropsType = {

}

export const Packs: FC<PacksPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.packs}>
			Packs
		</div>
	)
}
