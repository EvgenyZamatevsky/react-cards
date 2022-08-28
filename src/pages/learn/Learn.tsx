import React, { FC, useEffect, useState } from 'react'
import { CardType } from 'api/cards/types'
import { BackToPage, UniversalButton } from 'components'
import { Path } from 'enums'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getCards, updateCardGrade } from 'store/asyncActions/cards'
import { Nullable, ReturnComponentType } from 'types'
import { CurrentCardType } from './types'
import { resetMinValueAndMaxValue } from 'store/slices'
import { UniversalRadio } from 'components/common/universalRadio'
import style from './Learn.module.scss'
import {
	selectCardPage,
	selectCardPageCount,
	selectCards,
	selectIsAuth,
	selectIsDisabled,
	selectSearchCardValue,
	selectSortCards
} from 'store/selectors'

const grades: string[] = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer']

export const Learn: FC = (): ReturnComponentType => {

	const dispatch = useDispatch()

	const { packId } = useParams()
	const navigate = useNavigate()

	const cards = useSelector(selectCards)
	const searchCardValue = useSelector(selectSearchCardValue)
	const sortCards = useSelector(selectSortCards)
	const cardPage = useSelector(selectCardPage)
	const cardPageCount = useSelector(selectCardPageCount)
	const isAuth = useSelector(selectIsAuth)
	const isDisabled = useSelector(selectIsDisabled)

	const [isShowAnswer, setIsShowAnswer] = useState(false)
	const [isMounted, setIsMounted] = useState(true)
	const [gradeIndex, setGradeIndex] = useState(1)
	const [currentGrade, setCurrentGrade] = useState(grades[0])
	const [currentCard, setCurrentCard] = useState<Nullable<CurrentCardType>>(null)

	useEffect(() => {
		if (isMounted) {
			dispatch(getCards({
				packId: packId as string,
				cardQuestion: searchCardValue,
				sortCards,
				page: cardPage,
				pageCount: cardPageCount
			}) as any)
			setIsMounted(false)
		}

		if (cards.length > 0) {
			setCurrentCard(getCard(cards))
		}
	}, [packId, cards, isMounted])

	const getCard = (cards: CardType[]) => {
		const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
		const rand = Math.random() * sum
		const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
			const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
			return { sum: newSum, id: newSum < rand ? i : acc.id }
		}, { sum: 0, id: -1 })

		return cards[res.id + 1]
	}

	const onNextQuestionClick = (): void => {
		setGradeIndex(1)
		setCurrentGrade(grades[0])
		setIsShowAnswer(false)

		if (cards.length > 0) {
			dispatch(updateCardGrade({ updatedGrade: gradeIndex, cardId: currentCard!?._id }) as any)
			setCurrentCard(getCard(cards))
		}
	}

	const handleBackPacksListClick = (): void => {
		navigate(Path.PACKS)
		//dispatch(resetMinValueAndMaxValue())
	}

	const onShowAnswerActiveClick = (): void => setIsShowAnswer(true)

	const handleSetGradeIndexChange = (index: number): void => {
		setGradeIndex(index + 1)
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.container}>
			<BackToPage
				isDisabled={isDisabled}
				title={'Back to Packs List'}
				onBackToPageClick={handleBackPacksListClick}
			/>

			<div className={style.content}>
				<h2 className={style.title}>Learn</h2>

				<div className={style.body}>
					<div className={style.shots}>
						Number of attempts to answer a question:
						<span> {currentCard?.shots}</span>
					</div>
					<div className={style.questionContainer}>
						<span>Question:</span>
						<div className={style.question}>{currentCard?.question}</div>
					</div>
					{!isShowAnswer &&
						<UniversalButton
							className={style.showAnswerBtn}
							onClick={onShowAnswerActiveClick}
							disabled={isDisabled}
						>
							Show answer
						</UniversalButton>}

					{isShowAnswer &&
						<>
							<div className={style.answerContainer}>
								<span>Answer:</span>
								<div className={style.answer}>{currentCard?.answer}</div>
							</div>

							<div className={style.text}>Rate yourself:</div>

							<UniversalRadio
								primary
								options={grades}
								name='radio'
								value={currentGrade}
								setValue={setCurrentGrade}
								setIndex={handleSetGradeIndexChange}
							/>

							<UniversalButton
								className={style.nextQuestionBtn}
								onClick={onNextQuestionClick}
							>
								Next question
							</UniversalButton>
						</>
					}
				</div>
			</div>
		</div>
	)
}
