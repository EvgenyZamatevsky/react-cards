import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { BackPage, Card, Pagination, Search, Sort } from 'components'
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
import style from './Cards.module.scss'
import { Modal, ModalCard } from 'components/common'
import { EMPTY_STRING } from 'constants/base'

export const Cards: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const { packId } = useParams()
	const navigate = useNavigate()

	const isAuth = useSelector(selectIsAuth)
	const cards = useSelector(selectCards)
	const searchCardValue = useSelector(selectSearchCardValue)
	const sortCards = useSelector(selectSortCards)
	const cardPage = useSelector(selectCardPage)
	const cardPageCount = useSelector(selectCardPageCount)
	const isDisabled = useSelector(selectIsDisabled)
	const cardsTotalCount = useSelector(selectCardsTotalCount)

	const [isActiveModal, setIsActiveModal] = useState(false)
	const [questionValue, setQuestionValue] = useState(EMPTY_STRING)
	const [answerValue, setAnswerValue] = useState(EMPTY_STRING)

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

	const handleSortCardsByDescendingClick = (value: string): void => {
		dispatch(setSortCards(value))
	}

	const handleSortCardsByAscendingClick = (value: string): void => {
		dispatch(setSortCards(value))
	}

	const resetModalValues = (): void => {
		setIsActiveModal(false)
		setQuestionValue(EMPTY_STRING)
		setAnswerValue(EMPTY_STRING)
	}

	const onAddPackClick = (): void => {
		dispatch(addCard({ packId: packId as string, answer: answerValue, question: questionValue }))
		resetModalValues()
	}

	const handleBackPacksListClick = (): void => {
		navigate(Path.PACKS)
	}

	const handleSetPageClick = (page: number): void => {
		dispatch(setCardPage(page))
	}

	const handleSetPageCountChange = (pageCount: number): void => {
		dispatch(setCardPageCount(pageCount))
	}

	const handleDeactivateModalClick = (): void => resetModalValues()

	const handleActivateModalClick = (): void => setIsActiveModal(true)

	const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setAnswerValue(event.currentTarget.value)
	}

	const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setQuestionValue(event.currentTarget.value)
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<>
			<Modal isModalActive={isActiveModal} onDeactivateModalClick={handleDeactivateModalClick}>
				<ModalCard
					onDeactivateModalClick={handleDeactivateModalClick}
					onSaveClick={onAddPackClick}
					title={'Add new card'}
					onAnswerChange={handleAnswerChange}
					onQuestionChange={handleQuestionChange}
					answer={answerValue}
					question={questionValue}
				/>
			</Modal>
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
						onClick={handleActivateModalClick}
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
					pageCount={cardPageCount}
					page={cardPage}
					totalItemsCount={cardsTotalCount}
					handleSetPageClick={handleSetPageClick}
					handleSetPageCountChange={handleSetPageCountChange}
				/>
			</div>
		</>
	)
}
