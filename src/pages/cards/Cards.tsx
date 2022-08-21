import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { BackToPage, Card, Pagination, Search, Sort } from 'components'
import { Path } from 'enums'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { addCard, getCards } from 'store/asyncActions/cards'
import {
	selectAuthorizedUserId,
	selectCardPage,
	selectCardPageCount,
	selectCards,
	selectCardsTotalCount,
	selectIsAuth,
	selectIsDisabled,
	selectPackUserId,
	selectSearchCardValue,
	selectSortCards
} from 'store/selectors'
import { ReturnComponentType } from 'types'
import { resetMinValueAndMaxValue, setCardPage, setCardPageCount, setSearchCardValue, setSortCards } from 'store/slices'
import style from './Cards.module.scss'
import { Modal, ModalCard } from 'components/common'
import { EMPTY_STRING } from 'constants/base'
import { useAppDispatch } from 'hooks'

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
	const authorizedUserId = useSelector(selectAuthorizedUserId)
	const packUserId = useSelector(selectPackUserId)

	const [isActiveModal, setIsActiveModal] = useState(false)
	const [questionValue, setQuestionValue] = useState(EMPTY_STRING)
	const [answerValue, setAnswerValue] = useState(EMPTY_STRING)

	const questionInputRef = useRef<HTMLInputElement>(null)

	const sortCardsValues: string[] = ['Question', 'Answer', 'Last Updated', 'Grade']
	const sortCardsByDescending: string[] = ['0question', '0answer', '0updated', '0grade ']
	const sortCardsByAscending: string[] = ['1question', '1answer', '1updated', '1grade ']
	const isOwner = authorizedUserId === packUserId

	const cardsRender = cards.map(({ _id, question, answer, updated, grade }) => {
		return (
			<Card
				key={_id}
				cardId={_id}
				question={question}
				answer={answer}
				updated={updated}
				grade={grade}
				packId={packId!}
				isOwner={isOwner}
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
		dispatch(resetMinValueAndMaxValue())
	}

	const handleSetPageClick = (page: number): void => {
		dispatch(setCardPage(page))
	}

	const handleSetPageCountChange = (pageCount: number): void => {
		dispatch(setCardPageCount(pageCount))
	}

	const handleDeactivateModalClick = (): void => resetModalValues()

	const handleActivateModalClick = (): void => {
		setIsActiveModal(true)
		questionInputRef.current?.focus()
	}

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
			<Modal
				isModalActive={isActiveModal}
				onDeactivateModalClick={handleDeactivateModalClick}
			>
				<ModalCard
					onDeactivateModalClick={handleDeactivateModalClick}
					onSaveClick={onAddPackClick}
					title={'Add new card'}
					onAnswerChange={handleAnswerChange}
					onQuestionChange={handleQuestionChange}
					answer={answerValue}
					question={questionValue}
					ref={questionInputRef}
				/>
			</Modal>
			<div className={style.container}>
				<BackToPage
					title={'Back to Packs List'}
					onBackToPageClick={handleBackPacksListClick}
				/>

				<h2 className={style.title}>Cards</h2>
				<div className={style.content}>
					<Search
						searchValue={searchCardValue}
						handleSetSearchValueChange={handleSetSearchCardValueChange}
						handleResetSearchValueClick={handleResetSearchCardValueClick}
					/>
					{isOwner &&
						<button
							className={style.addNewCardBtn}
							onClick={handleActivateModalClick}
							disabled={isDisabled}
						>
							Add new card
						</button>}
				</div>
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
				{cards.length
					? cardsRender
					: <h2 className={style.emptyItems}>There are no cards in this pack</h2>}
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
