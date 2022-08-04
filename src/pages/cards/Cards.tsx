import { Card, Search, Sort } from 'components'
import { Path } from 'enums'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getCards } from 'store/asyncActions/cards'
import { useAppDispatch } from 'store/hooks'
import { selectCardQuestion, selectCards, selectIsAuth, selectSortCards } from 'store/selectors'
import { ReturnComponentType } from 'types'
import arrow from 'assets/icons/arrow.svg'
import style from './Cards.module.scss'
import { resetCards, setCardQuestion, setSortCards } from 'store/slices'

type CardsPropsType = {

}

export const Cards: FC<CardsPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const { cardId } = useParams()

	const isAuth = useSelector(selectIsAuth)
	const cards = useSelector(selectCards)
	const cardQuestion = useSelector(selectCardQuestion)
	const sortCards = useSelector(selectSortCards)

	const sortCardsValues: string[] = ['Question', 'Answer', 'Last Updated', 'Grade']
	const sortCardsByDescending: string[] = ['0question', '0answer', '0updated', '0grade '] // По убыванию
	const sortCardsByAscending: string[] = ['1question', '1answer', '1updated', '1grade '] // По возрастанию

	const cardsRender = cards.map(({ _id, question, answer, updated, grade }) => {
		return <Card key={_id} question={question} answer={answer} updated={updated} grade={grade} />
	})

	useEffect(() => {
		if (isAuth) {
			dispatch(getCards({ packId: cardId as string, cardQuestion, sortCards }))
		}
	}, [cardQuestion, sortCards])

	const handleSetCardQuestionChange = (value: string): void => {
		dispatch(setCardQuestion(value))
	}

	const handleResetCardQuestionClick = (resetValue: string): void => {
		dispatch(setCardQuestion(resetValue))
	}

	const onResetCardsClick = (): void => {
		dispatch(resetCards())
	}

	const handleSortCardsByDescendingClick = (value: any): void => {
		dispatch(setSortCards(value))
	}

	const handleSortCardsByAscendingClick = (value: any): void => {
		dispatch(setSortCards(value))
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
				<div className={style.sort}>
					<Sort
						sortValues={sortCardsValues}
						sortByDescending={sortCardsByDescending}
						sortByAscending={sortCardsByAscending}
						sortValue={sortCards}
						handleSortByDescendingClick={handleSortCardsByDescendingClick}
						handleSortByAscendingClick={handleSortCardsByAscendingClick}
					/>
				</div>
			</div>
			{cardsRender}
		</div>
	)
}
