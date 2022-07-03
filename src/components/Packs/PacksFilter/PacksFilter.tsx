import { useTypedDispatch } from 'hooks'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectSortPacks } from 'store/packsReducer/selectors'
import { getPacksTC } from 'store/packsReducer/thunks'
import { ReturnComponentType } from 'types'
import style from './PacksFilter.module.scss'

export type PacksFilterPropsType = {

}

export const PacksFilter: FC<PacksFilterPropsType> = (): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const sortPacks = useSelector(selectSortPacks)

	const sortingNameAscending = () => { // возрастанию
		dispatch(getPacksTC({ sortPacks: '1name' }))
	}

	const sortingNameDescending = () => { // убыванию
		dispatch(getPacksTC({ sortPacks: '0name' }))
	}

	const sortingCardsAscending = () => {
		dispatch(getPacksTC({ sortPacks: '1cardsCount' }))
	}

	const sortingCardsDescending = () => {
		dispatch(getPacksTC({ sortPacks: '0cardsCount' }))
	}

	const sortingLastUpdatedAscending = () => {
		dispatch(getPacksTC({ sortPacks: '1updated' }))
	}

	const sortingLastUpdatedDescending = () => {
		dispatch(getPacksTC({ sortPacks: '0updated' }))
	}

	const sortingCreatedByAscending = () => {
		dispatch(getPacksTC({ sortPacks: '1created' }))
	}

	const sortingCreatedByDescending = () => {
		dispatch(getPacksTC({ sortPacks: '0created' }))
	}

	return (
		<div className={style.info}>
			{sortPacks === '0name'
				? <button className={style.infoName} onClick={sortingNameAscending}>NameВ</button>
				: <button className={style.infoName} onClick={sortingNameDescending}>NameУ</button>
			}
			{sortPacks === '0cardsCount'
				? <button className={style.infoCards} onClick={sortingCardsAscending}>CardВ</button>
				: <button className={style.infoCards} onClick={sortingCardsDescending}>CardsУ</button>}
			{sortPacks === '0updated'
				? <button className={style.infoLastUpdated} onClick={sortingLastUpdatedAscending}>Last UpdatedВ</button>
				: <button className={style.infoLastUpdated} onClick={sortingLastUpdatedDescending}>Last UpdatedУ</button>}
			{sortPacks === '0created'
				? <button className={style.infoCreatedBy} onClick={sortingCreatedByAscending}>Created byВ</button>
				: <button className={style.infoCreatedBy} onClick={sortingCreatedByDescending}>Created byУ</button>}
			<div className={style.infoActions} >Actions</div>
		</div>
	)
}
