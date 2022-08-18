import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { ActionsPropsType } from './types'
import { useNavigate } from 'react-router-dom'
import cart from 'assets/icons/cart.svg'
import pencil from 'assets/icons/pencil.svg'
import teacher from 'assets/icons/teacher.svg'
import style from './Actions.module.scss'
import { Path } from 'enums'

export const Actions: FC<ActionsPropsType> =
	({
		onActivateDeleteModalClick,
		onActivateEditModalClick,
		isDisabled,
		cardsCount,
		packId,
		isOwner,
		isTeacherVisible = true
	}): ReturnComponentType => {

		const navigate = useNavigate()

		const onNavigateToLearnPageClick = (): void => navigate(`${Path.LEARN}/${packId}`)

		return (
			<div className={isOwner ? style.container : style.secondaryContainer}>
				{isTeacherVisible &&
					<button
						className={style.teacher}
						onClick={onNavigateToLearnPageClick}
						disabled={cardsCount === 0}
					>
						<img src={teacher} alt='teacher' />
					</button>}
				{isOwner &&
					<>
						<button onClick={onActivateDeleteModalClick} disabled={isDisabled}>
							<img src={cart} alt='cart' />
						</button>
						<button onClick={onActivateEditModalClick} disabled={isDisabled}>
							<img src={pencil} alt='pencil' />
						</button>
					</>}
			</div>
		)
	}
