import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react'
import { UniversalButton, ShowPacks, DoubleRange, Sort, Pagination, Search } from 'components'
import { Modal, ModalPack } from 'components/common'
import { Pack } from 'components/pack'
import { EMPTY_STRING, ERROR_MESSAGE } from 'constants/base'
import { Path } from 'enums'
import { useAppDispatch } from 'hooks'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getPacks, addPack } from 'store/asyncActions'
import { setMaxAndMinValue, setSearchPackValue, setSortValue, setPackPage, setPackPageCount } from 'store/slices'
import { ReturnComponentType } from 'types'
import style from './Packs.module.scss'
import {
	selectIsAuth,
	selectIsDisabled,
	selectPacks,
	selectSearchPackValue,
	selectSortValue,
	selectMinValue,
	selectMaxValue,
	selectMinCardsCount,
	selectMaxCardsCount,
	selectAuthorizedUserId,
	selectSelectedPack,
	selectPageCount,
	selectPage,
	selectPacksTotalCount
} from 'store/selectors'

export const Packs: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)
	const isDisabled = useSelector(selectIsDisabled)
	const packs = useSelector(selectPacks)
	const searchPackValue = useSelector(selectSearchPackValue)
	const sortValue = useSelector(selectSortValue)
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

	const namePackInputRef = useRef<HTMLInputElement>(null)

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
			sortPacks: sortValue,
			min: minValue,
			max: maxValue,
			pageCount,
			page,
			userId: authorizedUserId
		}))
	}, [searchPackValue, sortValue, minValue, maxValue, pageCount, page, selectedPack])

	const handleSetMinAndMaxValueMouseUp = useCallback(({ min, max }: { min: number, max: number }): void => {
		dispatch(setMaxAndMinValue({ max, min }))
	}, [])

	const handleSetSearchPackValueChange = (value: string): void => {
		dispatch(setSearchPackValue(value))
	}

	const handleResetSearchPackValueClick = (resetValue: string): void => {
		dispatch(setSearchPackValue(resetValue))
	}

	const handleSortPacksByAscendingClick = (value: string): void => {
		dispatch(setSortValue(value))
	}

	const handleSortPacksByDescendingClick = (value: string): void => {
		dispatch(setSortValue(value))
	}

	const handleSetPackPageClick = (page: number): void => {
		dispatch(setPackPage(page))
	}

	const handleSetPackPageCountChange = (pageCount: number): void => {
		dispatch(setPackPageCount(pageCount))
	}

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

	const onIsPackPrivateChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setIsPackPrivate(event.currentTarget.checked)
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<>
			<Modal isModalActive={isActiveModal} onDeactivateModalClick={handleDeactivateModalClick}>
				<ModalPack
					onDeactivateModalClick={handleDeactivateModalClick}
					setUpdatedPackName={setPackName}
					onCheckboxChange={onIsPackPrivateChange}
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
					<Search
						title={'Search'}
						searchValue={searchPackValue}
						handleSetSearchValueChange={handleSetSearchPackValueChange}
						handleResetSearchValueClick={handleResetSearchPackValueClick}
					/>
					<ShowPacks selectedPack={selectedPack} />
					<DoubleRange
						max={maxValue}
						min={minValue}
						maxDefaultValue={maxCardsCount}
						minDefaultValue={minCardsCount}
						onSetMinAndMaxValueMouseUp={handleSetMinAndMaxValueMouseUp}
					/>
				</div>
				<div className={style.sort}>
					<Sort
						sortValues={sortPacksValues}
						sortByDescending={sortPacksByDescending}
						sortByAscending={sortPacksByAscending}
						sortValue={sortValue}
						handleSortByAscendingClick={handleSortPacksByAscendingClick}
						handleSortByDescendingClick={handleSortPacksByDescendingClick}
						isDisabled={isDisabled}
					/>
					<div className={style.actions}>Actions</div>
				</div>
				{packs.length
					? packsRender
					: <h2 className={style.emptyItems}>This pack is empty</h2>}
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
