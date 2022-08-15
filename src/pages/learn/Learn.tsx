import { BackPage } from 'components'
import { Path } from 'enums'
import React, { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import style from './Learn.module.scss'

type LearnPropsType = {

}

export const Learn: FC<LearnPropsType> = (): ReturnComponentType => {

	const { packId } = useParams()
	const navigate = useNavigate()

	console.log(packId)

	const handleBackPacksListClick = (): void => navigate(Path.PACKS)

	return (
		<div className={style.container}>
			<BackPage
				title={'Back to Packs List'}
				isDisabled={false}
				onBackPageClick={handleBackPacksListClick}
			/>

			<div className={style.content}>
				<h2 className={style.title}>Learn “Pack Name”</h2>

				<div className={style.body}>
					<div className={style.shots}>Количество попыток ответов на вопрос: <span>10</span></div>
					<div className={style.question}><span>Question:</span> How "This" works in JavaScript?</div>
					<button className={style.showAnswerBtn}>Show answer</button>
				</div>
			</div>

		</div>
	)
}
