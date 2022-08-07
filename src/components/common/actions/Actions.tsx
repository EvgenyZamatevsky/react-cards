import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import cart from 'assets/icons/cart.svg'
import pencil from 'assets/icons/pencil.svg'
import style from './Actions.module.scss'

type ActionsPropsType = {
	onRemoveItemClick: () => void
	onUpdateItemClick: () => void
	isDisabled: boolean
}

export const Actions: FC<ActionsPropsType> =
	({ onRemoveItemClick, onUpdateItemClick, isDisabled }): ReturnComponentType => {
		return (
			<>
				<button className={style.cartIcon} onClick={onRemoveItemClick} disabled={isDisabled}>
					<img src={cart} alt='cart' />
				</button>
				<button className={style.pencilIcon} onClick={onUpdateItemClick} disabled={isDisabled}>
					<img src={pencil} alt='pencil' />
				</button>
			</>
		)
	}
