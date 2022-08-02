import { DoubleRange, Search, ShowPacks, Sort } from 'components'
import { Pack } from 'components/pack'
import { Path } from 'enums'
import React, { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
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
import { setMaxAndMinValue } from 'store/slices'
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

	const packsRender = packs.map(({ _id, name, cardsCount, updated, user_name }) => {
		return <Pack key={_id} _id={_id} name={name} cardsCount={cardsCount} updated={updated} user_name={user_name} />
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
				<Search />
				<ShowPacks selectedPack={selectedPack} />
				<DoubleRange
					max={maxValue}
					min={minValue}
					maxDefaultValue={maxCardsCount}
					minDefaultValue={minCardsCount}
					onSetMinAndMaxValueMouseUp={handleSetMinAndMaxValueMouseUp}
				/>
			</div>
			<Sort />
			{packsRender}
		</div>
	)
}
