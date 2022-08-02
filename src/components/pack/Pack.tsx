import React, { FC } from 'react'
import { removePack, updatePackName } from 'store/asyncActions/packs'
import { useAppDispatch } from 'store/hooks'
import { ReturnComponentType } from 'types'
import style from './Pack.module.scss'
import teacher from 'assets/icons/teacher.svg'
import cart from 'assets/icons/cart.svg'
import pencil from 'assets/icons/pencil.svg'

type PackPropsType = {
	_id: string
	name: string
	cardsCount: number
	updated: Date
	user_name: string
}

export const Pack: FC<PackPropsType> = ({ _id, name, cardsCount, updated, user_name }): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const onRemovePackClick = (): void => {
		dispatch(removePack(_id))
	}

	const onUpdatePackNameClick = (): void => {
		dispatch(updatePackName({ _id, name: '223' }))
	}

	return (
		<div className={style.container}>
			<div className={style.list}>
				<div className={style.name}>{name}</div>
				<div className={style.cardsCount}>{cardsCount}</div>
				<div className={style.updated}>{updated.toString()}</div>
				<div className={style.userName}>{user_name}</div>
				<div className={style.actions}>
					<button onClick={onRemovePackClick}>
						<img src={cart} alt='cart' />
					</button>
					<button onClick={onUpdatePackNameClick}>
						<img src={pencil} alt='pencil' />
					</button>
					<button>
						<img src={teacher} alt='teacher' />
					</button>
				</div>
			</div>
		</div>
	)
}
