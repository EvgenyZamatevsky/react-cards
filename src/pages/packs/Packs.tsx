import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { UniversalButton, ShowPacks, DoubleRange, Sort, Pagination, Search } from 'components'
import { Modal, ModalPack } from 'components/common'
import { Pack } from 'components/pack'
import { EMPTY_STRING, ERROR_MESSAGE } from 'constants/base'
import { useAppDispatch } from 'hooks'
import { useSelector } from 'react-redux'
import { getPacks, addPack } from 'store/asyncActions'
import { setSearchPackValue, setSortPacks, setPackPage, setPackPageCount, setMinValue, setMaxValue, setSelectedPack } from 'store/slices'
import { ReturnComponentType } from 'types'
import style from './Packs.module.scss'
import {
	selectIsDisabled,
	selectPacks,
	selectSearchPackValue,
	selectSortPacks,
	selectMinValue,
	selectMaxValue,
	selectMinCardsCount,
	selectMaxCardsCount,
	selectAuthorizedUserId,
	selectSelectedPack,
	selectPageCount,
	selectPage,
	selectPacksTotalCount,
	selectIsLoading
} from 'store/selectors'
import { useSearchParams } from 'react-router-dom'
import { SelectedPackType } from 'store/slices/packs/types'

export const Packs: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isDisabled = useSelector(selectIsDisabled)
	const isLoading = useSelector(selectIsLoading)
	const packs = useSelector(selectPacks)
	const searchPackValue = useSelector(selectSearchPackValue)
	const sortPacks = useSelector(selectSortPacks)
	const minValue = useSelector(selectMinValue)
	const maxValue = useSelector(selectMaxValue)
	const minCardsCount = useSelector(selectMinCardsCount)
	const maxCardsCount = useSelector(selectMaxCardsCount)
	const authorizedUserId = useSelector(selectAuthorizedUserId)
	const selectedPack = useSelector(selectSelectedPack)
	const pageCount = useSelector(selectPageCount)
	const page = useSelector(selectPage)
	const packsTotalCount = useSelector(selectPacksTotalCount)

	const [isActiveModal, setIsActiveModal] = useState(false)
	const [packName, setPackName] = useState(EMPTY_STRING)
	const [isPackPrivate, setIsPackPrivate] = useState(false)
	const [errorMessage, setErrorMessage] = useState(EMPTY_STRING)
	const [searchParams, setSearchParams] = useSearchParams()

	const namePackInputRef = useRef<HTMLInputElement>(null)
	const isMounted = useRef(false)

	const currentShowPacks = searchParams.get('showPacks') || selectedPack
	const sortPacksValues: string[] = ['Name', 'Cards', 'Last Updated', 'Created by']
	const sortPacksByDescending: string[] = ['0name', '0cardsCount', '0updated', '0user_name']
	const sortPacksByAscending: string[] = ['1name', '1cardsCount', '1updated', '1user_name']
	const packsRender = packs.map(({ _id, name, cardsCount, updated, user_name, user_id }) => {
		return (
			<Pack
				key={_id}
				packId={_id}
				userId={user_id}
				packName={name}
				cardsCount={cardsCount}
				packUpdated={updated}
				userName={user_name}
				isDisabled={isDisabled}
			/>
		)
	})

	useEffect(() => {
		dispatch(getPacks({
			packName: searchPackValue,
			sortPacks,
			min: minValue,
			max: maxValue,
			pageCount,
			page,
			userId: authorizedUserId
		}))
	}, [searchPackValue, sortPacks, minValue, maxValue, pageCount, page, selectedPack])

	useEffect(() => {
		setSearchParams({ showPacks: selectedPack })
	}, [selectedPack])

	useEffect(() => {
		dispatch(setSelectedPack(currentShowPacks as SelectedPackType))
	}, [currentShowPacks])

	useEffect(() => {
		if (isMounted.current) {
			window.scrollTo(0, 0)
		}

		isMounted.current = true
	}, [page, pageCount])

	const handleSetSearchPackValueChange = useCallback((value: string): void => {
		dispatch(setSearchPackValue(value))
	}, [])

	const handleResetSearchPackValueClick = useCallback((resetValue: string): void => {
		dispatch(setSearchPackValue(resetValue))
	}, [])

	const handleSortPacksByAscendingClick = (value: string): void => {
		dispatch(setSortPacks(value))
	}

	const handleSortPacksByDescendingClick = (value: string): void => {
		dispatch(setSortPacks(value))
	}

	const handleSetPackPageClick = useCallback((page: number): void => {
		dispatch(setPackPage(page))
	}, [])

	const handleSetPackPageCountChange = useCallback((pageCount: number): void => {
		dispatch(setPackPageCount(pageCount))
	}, [])

	const resetModalValues = (): void => {
		setIsActiveModal(false)
		setPackName(EMPTY_STRING)
		setIsPackPrivate(false)
		setErrorMessage(EMPTY_STRING)
	}

	const handleDeactivateModalClick = (): void => resetModalValues()

	const handleActivateModalClick = (): void => {
		setIsActiveModal(true)
		namePackInputRef.current?.focus()
	}

	const onAddPackClick = (): void => {
		const packNameTrimmed = packName.trim()

		if (packNameTrimmed !== EMPTY_STRING) {
			dispatch(addPack({ authorizedUserId, packName: packNameTrimmed, isPackPrivate }))
			resetModalValues()
		} else {
			setErrorMessage(ERROR_MESSAGE)
		}
	}

	const handleSetMaxValueMouseUp = useCallback((max: number): void => {
		dispatch(setMaxValue(max))
	}, [])

	const handleSetMinValueMouseUp = useCallback((min: number): void => {
		dispatch(setMinValue(min))
	}, [])

	return (
		<>
			<Modal isModalActive={isActiveModal} onDeactivateModalClick={handleDeactivateModalClick}>
				<ModalPack
					onDeactivateModalClick={handleDeactivateModalClick}
					setUpdatedPackName={setPackName}
					setIsPackPrivate={setIsPackPrivate}
					onSaveClick={onAddPackClick}
					value={packName}
					isPackPrivate={isPackPrivate}
					isLabelItem={true}
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
					ref={namePackInputRef}
					title={'Add new pack'}
				/>
			</Modal>
			<div className={style.container}>
				<div className={style.top}>
					<h2 className={style.title}>Packs list</h2>
					<UniversalButton
						primary
						additionalPrimaryBtn={style.addNewPackBtn}
						onClick={handleActivateModalClick}
						disabled={isDisabled}>
						Add new pack
					</UniversalButton>
				</div>
				<div className={style.main}>
					<div>
						<div className={style.searchText}>Search</div>
						<Search
							searchValue={searchPackValue}
							isDisabled={isDisabled}
							handleSetSearchValueChange={handleSetSearchPackValueChange}
							handleResetSearchValueClick={handleResetSearchPackValueClick}
						/>
					</div>
					<div>
						<div className={style.showPacksCards}>Show packs cards</div>
						<ShowPacks
							selectedPack={selectedPack}
							isDisabled={isDisabled}
							setSearchParams={setSearchParams}
						/>
					</div>
					<div>
						<div className={style.numberOfCards}>Number of cards</div>
						<DoubleRange
							max={maxValue}
							min={minValue}
							maxDefaultValue={maxCardsCount}
							minDefaultValue={minCardsCount}
							setMaxValueMouseUp={handleSetMaxValueMouseUp}
							setMinValueMouseUp={handleSetMinValueMouseUp}
							isDisabled={isDisabled}
						/>
					</div>
				</div>
				<div className={style.sort}>
					<Sort
						sortValues={sortPacksValues}
						sortByDescending={sortPacksByDescending}
						sortByAscending={sortPacksByAscending}
						sortValue={sortPacks}
						handleSortByAscendingClick={handleSortPacksByAscendingClick}
						handleSortByDescendingClick={handleSortPacksByDescendingClick}
						isDisabled={isDisabled}
					/>
					<div className={style.actions}>Actions</div>
				</div>
				{packs.length
					? packsRender
					: !isLoading && <h2 className={style.emptyItems}>No packs</h2>}
				<Pagination
					pageCount={pageCount}
					page={page}
					handleSetPageClick={handleSetPackPageClick}
					handleSetPageCountChange={handleSetPackPageCountChange}
					totalItemsCount={packsTotalCount}
				/>
			</div>
		</>
	)
}
