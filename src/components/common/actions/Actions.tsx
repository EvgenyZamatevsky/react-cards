import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import cart from 'assets/icons/cart.svg'
import pencil from 'assets/icons/pencil.svg'
import style from './Actions.module.scss'

type ActionsPropsType = {
	onActivateDeleteModalClick: () => void
	onActivateEditModalClick: () => void
	isDisabled: boolean
}

export const Actions: FC<ActionsPropsType> =
	({ onActivateDeleteModalClick, onActivateEditModalClick, isDisabled }): ReturnComponentType => {
		return (
			<>
				<button className={style.cartIcon} onClick={onActivateDeleteModalClick} disabled={isDisabled}>
					<img src={cart} alt='cart' />
				</button>
				<button className={style.pencilIcon} onClick={onActivateEditModalClick} disabled={isDisabled}>
					<img src={pencil} alt='pencil' />
				</button>
			</>
		)
	}
