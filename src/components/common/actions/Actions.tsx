import React, { FC, memo } from 'react'
import { ReturnComponentType } from 'types'
import { ActionsPropsType } from './types'
import { Link } from 'react-router-dom'
import { Path } from 'enums'
import { useSelector } from 'react-redux'
import { selectIsDisabled } from 'store/selectors'
import { UniversalButton } from '../universalButton'
import cart from 'assets/icons/cart.svg'
import pencil from 'assets/icons/pencil.svg'
import teacher from 'assets/icons/teacher.svg'
import style from './Actions.module.scss'

export const Actions: FC<ActionsPropsType> =
	memo(({
		onActivateDeleteModalClick,
		onActivateEditModalClick,
		cardsCount,
		packId,
		isOwner,
		isVisibleTeacher = true
	}): ReturnComponentType => {

		const isDisabled = useSelector(selectIsDisabled)

		return (
			<div className={isOwner ? style.container : style.secondaryContainer}>
				{isVisibleTeacher &&
					<Link
						to={`${Path.LEARN}/${packId}`}
						className={`${style.teacher} ${(isDisabled || cardsCount === 0) && style.disabledLink}`}
					>
						<img src={teacher} alt='teacher' />
					</Link>
				}
				{isOwner &&
					<>
						<UniversalButton onClick={onActivateDeleteModalClick} disabled={isDisabled}>
							<img src={cart} alt='cart' />
						</UniversalButton>
						<UniversalButton onClick={onActivateEditModalClick} disabled={isDisabled}>
							<img src={pencil} alt='pencil' />
						</UniversalButton>
					</>}
			</div>
		)
	})
