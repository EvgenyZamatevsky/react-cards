import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import { ActionsPropsType } from './types'
import { useNavigate } from 'react-router-dom'
import cart from 'assets/icons/cart.svg'
import pencil from 'assets/icons/pencil.svg'
import teacher from 'assets/icons/teacher.svg'
import style from './Actions.module.scss'
import { Path } from 'enums'
import { useSelector } from 'react-redux'
import { selectIsDisabled } from 'store/selectors'
import { UniversalButton } from '../universalButton'

export const Actions: FC<ActionsPropsType> =
	({
		onActivateDeleteModalClick,
		onActivateEditModalClick,
		cardsCount,
		packId,
		isOwner,
		isTeacherVisible = true
	}): ReturnComponentType => {

		const isDisabled = useSelector(selectIsDisabled)

		const navigate = useNavigate()

		const onNavigateToLearnPageClick = (): void => {
			navigate(`${Path.LEARN}/${packId}`)
		}

		return (
			<div className={isOwner ? style.container : style.secondaryContainer}>
				{isTeacherVisible &&
					<UniversalButton
						className={style.teacher}
						onClick={onNavigateToLearnPageClick}
						disabled={cardsCount === 0 || isDisabled}
					>
						<img src={teacher} alt='teacher' />
					</UniversalButton>
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
	}
