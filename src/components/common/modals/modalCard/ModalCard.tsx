import React, { FC, forwardRef } from 'react'
import { ReturnComponentType } from 'types'
import cross from 'assets/icons/cross.svg'
import style from './ModalCard.module.scss'
import { ModalCardPropsType } from './types'
import { UniversalButton } from 'components/common/universalButton'

export const ModalCard: FC<ModalCardPropsType> =
	forwardRef(({
		question,
		answer,
		onQuestionChange,
		onAnswerChange,
		onDeactivateModalClick,
		onSaveClick,
		title,
	},
		ref): ReturnComponentType => {

		return (
			<div className={style.container}>
				<div className={style.top}>
					<div className={style.title}>{title}</div>
					<img className={style.cross} src={cross} alt='cross' onClick={onDeactivateModalClick} />
				</div>

				<input
					className={style.question}
					type='text'
					placeholder='Question'
					value={question}
					onChange={onQuestionChange}
					ref={ref}
				/>
				<input
					className={style.answer}
					type='text'
					placeholder='Answer'
					value={answer}
					onChange={onAnswerChange}
				/>

				<div className={style.buttons}>
					<UniversalButton className={style.cancelBtn} onClick={onDeactivateModalClick}>Cancel</UniversalButton>
					<UniversalButton className={style.saveBtn} onClick={onSaveClick}>Save</UniversalButton>
				</div>
			</div>
		)
	})
