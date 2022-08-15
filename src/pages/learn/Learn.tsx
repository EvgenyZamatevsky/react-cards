import React, { FC, useEffect, useState } from 'react'
import { CardType } from 'api/cards/types'
import { BackPage } from 'components'
import { Path } from 'enums'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getCards, updateCardGrade } from 'store/asyncActions/cards'
import { selectCardPage, selectCardPageCount, selectCards, selectIsAuth, selectSearchCardValue, selectSortCards } from 'store/selectors'
import { ReturnComponentType } from 'types'
import style from './Learn.module.scss'

type LearnPropsType = {

}

const grades: string[] = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал']

export const Learn: FC<LearnPropsType> = (): ReturnComponentType => {

	const dispatch = useDispatch()

	const { packId } = useParams()
	const navigate = useNavigate()

	const cards = useSelector(selectCards)
	const searchCardValue = useSelector(selectSearchCardValue)
	const sortCards = useSelector(selectSortCards)
	const cardPage = useSelector(selectCardPage)
	const cardPageCount = useSelector(selectCardPageCount)
	const isAuth = useSelector(selectIsAuth)

	const [isShowAnswer, setIsShowAnswer] = useState(false)
	const [first, setFirst] = useState(true)
	const [gradeValue, setGradeValue] = useState(0)
	const [card, setCard] = useState<any>({
		_id: 'fake',
		cardsPack_id: '',

		answer: 'answer fake',
		question: 'question fake',
		grade: 0,
		shots: 0,

		type: '',
		rating: 0,
		more_id: '',

		created: '',
		updated: '',
	})

	useEffect(() => {
		if (first) {
			//@ts-ignore
			dispatch(getCards({ packId: packId, cardQuestion: searchCardValue, sortCards, page: cardPage, pageCount: cardPageCount }))
			setFirst(false)
		}

		if (cards.length > 0) {
			setCard(getCard(cards))
		}

		return () => {
			//	console.log('LearnContainer useEffect off')
		}
	}, [packId, cards, first])

	const getCard = (cards: CardType[]) => {
		const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
		const rand = Math.random() * sum
		const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
			const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
			return { sum: newSum, id: newSum < rand ? i : acc.id }
		}
			, { sum: 0, id: -1 })

		return cards[res.id + 1]
	}

	const onNext = () => {
		setGradeValue(0)
		setIsShowAnswer(false)

		if (cards.length > 0) {
			//@ts-ignore
			dispatch(updateCardGrade({ grade: gradeValue, cardId: card._id }))
			setCard(getCard(cards))
		} else {

		}
	}

	const handleBackPacksListClick = (): void => navigate(Path.PACKS)

	const onShowAnswerActiveClick = (): void => setIsShowAnswer(true)

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

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
					<div className={style.shots}>Количество попыток ответов на вопрос: <span>{card.shots}</span></div>
					<div className={style.question}><span>Question:</span> {card.question}</div>
					{!isShowAnswer && <button className={style.showAnswerBtn} onClick={onShowAnswerActiveClick}>Show answer</button>}

					{isShowAnswer &&
						<>
							<div className={style.answer}><span>Answer:</span> {card.answer}</div>

							<div className={style.text}>Rate yourself:</div>

							{grades.map((grade, index) => {
								return (
									<div key={'grade-' + index}>
										<button onClick={() => setGradeValue(index + 1)}>
											{grade}
										</button>
									</div>
								)
							})}

							<button
								disabled={gradeValue === 0}
								className={style.nextQuestionBtn}
								onClick={onNext}
							>
								Next question
							</button>
						</>
					}
				</div>
			</div>
		</div>
	)
}
