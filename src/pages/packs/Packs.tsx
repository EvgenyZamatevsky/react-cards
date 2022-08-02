import { DoubleRange, NavBar, Search, Sort } from 'components'
import { Pack } from 'components/pack'
import { Path } from 'enums'
import React, { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { addPack, getPacks } from 'store/asyncActions/packs'
import { useAppDispatch } from 'store/hooks'
import { selectIsAuth, selectMaxCardsCount, selectMaxValue, selectMinCardsCount, selectMinValue, selectPacks, selectSearchValue, selectSortValue } from 'store/selectors'
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

	const packsRender = packs.map(({ _id, name, cardsCount, updated, user_name }) => {
		return <Pack key={_id} _id={_id} name={name} cardsCount={cardsCount} updated={updated} user_name={user_name} />
	})

	const onAddPackClick = (): void => {
		dispatch(addPack({ name: '322', private: false })) // private доработать
	}

	useEffect(() => {
		if (isAuth) {
			dispatch(getPacks({ packName: searchValue, sortPacks: sortValue, min: minValue, max: maxValue }))
		}
	}, [searchValue, sortValue, minValue, maxValue])

	const handleSetMinAndMaxValueMouseUp = useCallback(({ min, max }: { min: number, max: number }) => {
		dispatch(setMaxAndMinValue({ max: max, min: min }))
	}, [])

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
				<div>
					<div className={style.search}>Search</div>
					<Search />
				</div>
				<div>
					<div className={style.showPacksCards}>Show packs cards</div>
					<div className={style.showPacksButtons}>
						<button className={style.myBtn}>My</button>
						<button className={style.allBtn}>All</button>
					</div>
				</div>
				<div>
					<div className={style.numberOfCards}>Number of cards</div>
					<DoubleRange
						max={maxValue}
						min={minValue}
						maxDefaultValue={maxCardsCount}
						minDefaultValue={minCardsCount}
						onSetMinAndMaxValueMouseUp={handleSetMinAndMaxValueMouseUp}
					/>
				</div>
			</div>
			<Sort />
			{packsRender}
		</div>
	)
}
