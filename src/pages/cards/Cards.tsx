import React, { FC, useEffect } from 'react'
import { Card, Search, Sort } from 'components'
import { Path } from 'enums'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { addCard, getCards } from 'store/asyncActions/cards'
import { useAppDispatch } from 'store/hooks'
import {
	selectCardPage,
	selectCardPageCount,
	selectCards,
	selectCardsTotalCount,
	selectIsAuth,
	selectIsDisabled,
	selectSearchCardValue,
	selectSortCards
} from 'store/selectors'
import { ReturnComponentType } from 'types'
import { setCardPage, setCardPageCount, setSearchCardValue, setSortCards } from 'store/slices'
import { BackPage } from 'components/common/backPage'
import style from './Cards.module.scss'
import { Pagination } from 'components/common/pagination'

type CardsPropsType = {

}

export const Cards: FC<CardsPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const { packId } = useParams()
	const navigate = useNavigate()

	const isAuth = useSelector(selectIsAuth)
	const cards = useSelector(selectCards)
	const searchCardValue = useSelector(selectSearchCardValue)
	const sortCards = useSelector(selectSortCards)
	const isDisabled = useSelector(selectIsDisabled)
	const cardPage = useSelector(selectCardPage)
	const cardPageCount = useSelector(selectCardPageCount)
	const cardsTotalCount = useSelector(selectCardsTotalCount)

	const sortCardsValues: string[] = ['Question', 'Answer', 'Last Updated', 'Grade']
	const sortCardsByDescending: string[] = ['0question', '0answer', '0updated', '0grade ']
	const sortCardsByAscending: string[] = ['1question', '1answer', '1updated', '1grade ']

	const cardsRender = cards.map(({ _id, question, answer, updated, grade, user_id }) => {
		return (
			<Card
				key={_id}
				cardId={_id}
				question={question}
				answer={answer}
				updated={updated}
				grade={grade}
				packId={packId!}
				isDisabled={isDisabled}
				user_id={user_id}
			/>
		)
	})

	useEffect(() => {
		if (isAuth) {
			dispatch(getCards(
				{
					packId: packId as string,
					cardQuestion: searchCardValue,
					sortCards,
					page: cardPage,
					pageCount: cardPageCount
				}))
		}
	}, [searchCardValue, sortCards, cardPage, cardPageCount])

	const handleSetSearchCardValueChange = (value: string): void => {
		dispatch(setSearchCardValue(value))
	}

	const handleResetSearchCardValueClick = (resetValue: string): void => {
		dispatch(setSearchCardValue(resetValue))
	}

	const handleSortCardsByDescendingClick = (value: any): void => {
		dispatch(setSortCards(value))
	}

	const handleSortCardsByAscendingClick = (value: any): void => {
		dispatch(setSortCards(value))
	}

	const onAddPackClick = (): void => {
		dispatch(addCard({ packId: packId as string, answer: 'ttt', question: 'aaa' }))
	}

	const handleBackPacksListClick = (): void => {
		navigate(Path.PACKS)
	}

	const handleSetCurrentPageClick = (page: number): void => {
		dispatch(setCardPage(page))
	}

	const handleSetPageCountChange = (pageCount: number): void => {
		dispatch(setCardPageCount(pageCount))
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.container}>
			<BackPage
				title={'Back to Packs List'}
				isDisabled={isDisabled}
				onBackPageClick={handleBackPacksListClick}
			/>

			<div className={style.top}>
				<h2 className={style.title}>Packs list</h2>
			</div>
			<div className={style.main}>
				<Search
					searchValue={searchCardValue}
					handleSetSearchValueChange={handleSetSearchCardValueChange}
					handleResetSearchValueClick={handleResetSearchCardValueClick}
				/>
				<button
					className={style.addNewPackBtn}
					onClick={onAddPackClick}
					disabled={isDisabled}
				>
					Add new card
				</button>
			</div>
			<div className={style.bottom}>
				<div className={style.sort}>
					<Sort
						sortValues={sortCardsValues}
						sortByDescending={sortCardsByDescending}
						sortByAscending={sortCardsByAscending}
						sortValue={sortCards}
						isDisabled={isDisabled}
						handleSortByDescendingClick={handleSortCardsByDescendingClick}
						handleSortByAscendingClick={handleSortCardsByAscendingClick}
					/>
				</div>
			</div>
			{cardsRender}
			<Pagination
				count={cardPageCount}
				currentPage={cardPage}
				totalItemsCount={cardsTotalCount}
				handleSetCurrentPageClick={handleSetCurrentPageClick}
				handleSetPageCountChange={handleSetPageCountChange}
			/>
		</div>
	)
}
