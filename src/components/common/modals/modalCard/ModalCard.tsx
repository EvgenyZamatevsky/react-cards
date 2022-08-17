import React, { ChangeEvent, FC } from 'react'
import { ReturnComponentType } from 'types'
import cross from 'assets/icons/cross.svg'
import style from './ModalCard.module.scss'
import { ModalCardPropsType } from './types'

export const ModalCard: FC<ModalCardPropsType> =
	({ question, answer, onQuestionChange, onAnswerChange, onDeactivateModalClick, onSaveClick, title, }): ReturnComponentType => {

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
				/>
				<input
					className={style.answer}
					type='text'
					placeholder='Answer'
					value={answer}
					onChange={onAnswerChange}
				/>

				<div className={style.buttons}>
					<button className={style.cancelBtn} onClick={onDeactivateModalClick}>Cancel</button>
					<button className={style.saveBtn} onClick={onSaveClick}>Save</button>
				</div>
			</div>
		)
	}
