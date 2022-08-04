import { DoubleRange, Search, ShowPacks, Sort } from 'components'
import { Pack } from 'components/pack'
import { Path } from 'enums'
import React, { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { addPack, getPacks } from 'store/asyncActions/packs'
import { useAppDispatch } from 'store/hooks'
import {
	selectAuthorizedUserData,
	selectIsAuth,
	selectMaxCardsCount,
	selectMaxValue,
	selectMinCardsCount,
	selectMinValue,
	selectPacks,
	selectPage,
	selectPageCount,
	selectSearchValue,
	selectSelectedPack,
	selectSortValue
} from 'store/selectors'
import { setMaxAndMinValue, setSearchValue, setSortValue } from 'store/slices'
import { ReturnComponentType } from 'types'
import style from './Packs.module.scss'

type PacksPropsType = {

}

export const Packs: FC<PacksPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const isAuth = useSelector(selectIsAuth)
	const packs = useSelector(selectPacks)
	const searchValue = useSelector(selectSearchValue)
	const sortValue = useSelector(selectSortValue)
	const minValue = useSelector(selectMinValue)
	const maxValue = useSelector(selectMaxValue)
	const minCardsCount = useSelector(selectMinCardsCount)
	const maxCardsCount = useSelector(selectMaxCardsCount)
	const pageCount = useSelector(selectPageCount)
	const authorizedUserData = useSelector(selectAuthorizedUserData)
	const selectedPack = useSelector(selectSelectedPack)
	const page = useSelector(selectPage)

	const sortPacksValues: string[] = ['Name', 'Cards', 'Last Updated', 'Created by']
	const sortPacksByDescending: string[] = ['0name', '0cardsCount', '0updated', '0user_name'] // По убыванию
	const sortPacksByAscending: string[] = ['1name', '1cardsCount', '1updated', '1user_name'] // По возрастанию

	const packsRender = packs.map(({ _id, name, cardsCount, updated, user_name, user_id }) => {
		return <Pack key={_id} _id={_id} user_id={user_id} name={name} cardsCount={cardsCount} updated={updated} user_name={user_name} />
	})

	useEffect(() => {
		if (isAuth && selectedPack === 'All') {
			dispatch(getPacks({ packName: searchValue, sortPacks: sortValue, min: minValue, max: maxValue, page, pageCount }))
		} else {
			dispatch(getPacks({ packName: searchValue, sortPacks: sortValue, min: minValue, max: maxValue, pageCount, page, userId: authorizedUserData?._id }))
		}
	}, [searchValue, sortValue, minValue, maxValue, pageCount, page, selectedPack])

	const handleSetMinAndMaxValueMouseUp = useCallback(({ min, max }: { min: number, max: number }) => {
		dispatch(setMaxAndMinValue({ max, min }))
	}, [])

	const onAddPackClick = (): void => {
		dispatch(addPack({ name: '322', private: false })) // private доработать
	}

	const handleSetSearchValueChange = (value: string): void => {
		dispatch(setSearchValue(value))
	}

	const handleResetSearchValueClick = (resetValue: string): void => {
		dispatch(setSearchValue(resetValue))
	}

	const handleSortPacksByAscendingClick = (value: any): void => {
		dispatch(setSortValue(value))
	}

	const handleSortPacksByDescendingClick = (value: any): void => {
		dispatch(setSortValue(value))
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.container}>
			<div className={style.top}>
				<h2 className={style.title}>Packs list</h2>
				<button className={style.addNewPackBtn} onClick={onAddPackClick}>Add new pack</button>
			</div>
			<div className={style.main}>
				<Search
					title={'Search'}
					searchValue={searchValue}
					handleSetSearchValueChange={handleSetSearchValueChange}
					handleResetSearchValueClick={handleResetSearchValueClick}
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
				/>
				<div className={style.actions}>Actions</div>
			</div>
			{packsRender}
		</div>
	)
}
