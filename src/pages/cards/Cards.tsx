import { Card, Search, Sort } from 'components'
import { Path } from 'enums'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getCards } from 'store/asyncActions/cards'
import { useAppDispatch } from 'store/hooks'
import { selectCardQuestion, selectCards, selectIsAuth } from 'store/selectors'
import { ReturnComponentType } from 'types'
import arrow from 'assets/icons/arrow.svg'
import style from './Cards.module.scss'
import { resetCards, setCardQuestion } from 'store/slices'

type CardsPropsType = {

}

export const Cards: FC<CardsPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const { cardId } = useParams()

	const isAuth = useSelector(selectIsAuth)
	const cards = useSelector(selectCards)
	const cardQuestion = useSelector(selectCardQuestion)

	const cardsRender = cards.map(({ _id, question, answer, updated, grade }) => {
		return <Card key={_id} question={question} answer={answer} updated={updated} grade={grade} />
	})

	useEffect(() => {
		if (isAuth) {
			dispatch(getCards({ packId: cardId as string, cardQuestion }))
		}
	}, [cardQuestion])

	const handleSetCardQuestionChange = (value: string): void => {
		dispatch(setCardQuestion(value))
	}

	const handleResetCardQuestionClick = (resetValue: string): void => {
		dispatch(setCardQuestion(resetValue))
	}

	const onResetCardsClick = (): void => {
		dispatch(resetCards())
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.container}>
			<Link to={Path.PACKS} className={style.backToPacksListBtn} onClick={onResetCardsClick}>
				<img src={arrow} alt='arrow' />
				<div>Back to Packs List</div>
			</Link>

			<div className={style.top}>
				<h2 className={style.title}>Packs list</h2>
			</div>
			<div className={style.main}>
				<Search
					searchValue={cardQuestion}
					handleSetSearchValueChange={handleSetCardQuestionChange}
					handleResetSearchValueClick={handleResetCardQuestionClick}
				/>
				<button className={style.addNewPackBtn} onClick={() => { }}>Add new card</button>
			</div>
			<div className={style.bottom}>
				<Sort />
			</div>
			{cardsRender}
		</div>
	)
}
