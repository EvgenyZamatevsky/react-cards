import React, { FC, forwardRef } from 'react'
import { ReturnComponentType } from 'types'
import { ModalCardPropsType } from './types'
import { UniversalButton } from 'components/common/universalButton'
import { UniversalInput } from 'components/common/universalInput'
import cross from 'assets/icons/cross.svg'
import style from './ModalCard.module.scss'

export const ModalCard: FC<ModalCardPropsType> =
	forwardRef(({
		question,
		answer,
		setQuestionValue,
		setAnswerValue,
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

				<UniversalInput
					primary
					additionalPrimaryInput={style.question}
					placeholder='Question'
					value={question}
					setValue={setQuestionValue}
					ref={ref}
				/>
				<UniversalInput
					primary
					additionalPrimaryInput={style.answer}
					placeholder='Answer'
					value={answer}
					setValue={setAnswerValue}
				/>

				<div className={style.buttons}>
					<UniversalButton className={style.cancelBtn} onClick={onDeactivateModalClick}>Cancel</UniversalButton>
					<UniversalButton className={style.saveBtn} onClick={onSaveClick}>Save</UniversalButton>
				</div>
			</div>
		)
	})
