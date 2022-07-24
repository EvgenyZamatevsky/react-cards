import { NavBar, PacksList } from 'components'
import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Packs.module.scss'

type PacksPropsType = {

}

export const Packs: FC<PacksPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.packs}>
			<div className={style.body}>
				<NavBar />
				<div className={style.packsList}>
					<PacksList />
				</div>
			</div>
		</div>
	)
}
