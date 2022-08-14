import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { DoubleRange, Pagination, Search, ShowPacks, Sort } from 'components'
import { Modal, ModalPack } from 'components/common'
import { Pack } from 'components/pack'
import { Path } from 'enums'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { addPack, getPacks } from 'store/asyncActions/packs'
import { useAppDispatch } from 'store/hooks'
import { setMaxAndMinValue, setPackPage, setPackPageCount, setSearchPackValue, setSortValue } from 'store/slices'
import { ReturnComponentType } from 'types'
import {
	selectAuthorizedUserData,
	selectIsAuth,
	selectIsDisabled,
	selectMaxCardsCount,
	selectMaxValue,
	selectMinCardsCount,
	selectMinValue,
	selectPacks,
	selectPacksTotalCount,
	selectPage,
	selectPageCount,
	selectSearchPackValue,
	selectSelectedPack,
	selectSortValue
} from 'store/selectors'
import { EMPTY_STRING } from 'constants/base'
import style from './Packs.module.scss'

type PacksPropsType = {

}

export const Packs: FC<PacksPropsType> = (): ReturnComponentType => {

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
	const authorizedUserData = useSelector(selectAuthorizedUserData)
	const selectedPack = useSelector(selectSelectedPack)
	const pageCount = useSelector(selectPageCount)
	const page = useSelector(selectPage)
	const packsTotalCount = useSelector(selectPacksTotalCount)

	const [isActiveModal, setIsActiveModal] = useState(false)
	const [packName, setPackName] = useState(EMPTY_STRING)
	const [isPackPrivate, setIsPackPrivate] = useState(false)

	const sortPacksValues: string[] = ['Name', 'Cards', 'Last Updated', 'Created by']
	const sortPacksByDescending: string[] = ['0name', '0cardsCount', '0updated', '0user_name']
	const sortPacksByAscending: string[] = ['1name', '1cardsCount', '1updated', '1user_name']

	const packsRender = packs.map(({ _id, name, cardsCount, updated, user_name, user_id }) => {
		return (
			<Pack
				key={_id}
				_id={_id}
				user_id={user_id}
				name={name}
				cardsCount={cardsCount}
				updated={updated}
				user_name={user_name}
				isDisabled={isDisabled}
			/>
		)
	})

	useEffect(() => {
		if (isAuth && selectedPack === 'All') {
			dispatch(getPacks(
				{
					packName: searchPackValue,
					sortPacks: sortValue,
					min: minValue,
					max: maxValue,
					page,
					pageCount
				}))
		} else {
			dispatch(getPacks(
				{
					packName: searchPackValue,
					sortPacks: sortValue,
					min: minValue,
					max: maxValue,
					pageCount,
					page,
					userId: authorizedUserData?._id
				}))
		}
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
	}

	const handleDeactivateModalClick = (): void => {
		resetModalValues()
	}

	const handleActivateModalClick = (): void => {
		setIsActiveModal(true)
	}

	const onAddPackClick = (): void => {
		dispatch(addPack({ name: packName, private: isPackPrivate }))
		resetModalValues()
	}

	const onPackNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setPackName(event.currentTarget.value)
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
					onInputChange={onPackNameChange}
					onCheckboxChange={onIsPackPrivateChange}
					onSaveClick={onAddPackClick}
					value={packName}
					isPackPrivate={isPackPrivate}
					isLabelItem={true}
					title={'Add new pack'}
				/>
			</Modal>
			<div className={style.container}>
				<div className={style.top}>
					<h2 className={style.title}>Packs list</h2>
					<button
						className={style.addNewPackBtn}
						onClick={handleActivateModalClick}
						disabled={isDisabled}>
						Add new pack
					</button>
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
				{packsRender}
				<Pagination
					count={pageCount}
					currentPage={page}
					handleSetCurrentPageClick={handleSetPackPageClick}
					handleSetPageCountChange={handleSetPackPageCountChange}
					totalItemsCount={packsTotalCount}
				/>
			</div>
		</>
	)
}
