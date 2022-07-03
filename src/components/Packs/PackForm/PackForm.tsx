import { useTypedDispatch } from 'hooks'
import React, { ChangeEvent, FC } from 'react'
import { createPackTC, getPacksTC } from 'store/packsReducer/thunks'
import { ReturnComponentType } from 'types'
import style from './PackForm.module.scss'

export type PackFormPropsType = {
	setSearchPack: (searchPack: string) => void
	searchPack: string
}

export const PackForm: FC<PackFormPropsType> = ({ setSearchPack, searchPack }): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const onSearchPackChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchPack(e.currentTarget.value)
	}

	const onSearchPackClick = (): void => {
		dispatch(getPacksTC({ packName: searchPack }))
	}

	const onAddNewPackClick = (): void => {
		dispatch(createPackTC({ cardsPack: { name: 'ПОЛУЧИЛОСЬ!!!', deckCover: '', private: false } }))
	}

	return (
		<>
			<input className={style.search}
				type='text'
				placeholder='Search'
				value={searchPack}
				onChange={onSearchPackChange}
			/>
			<button onClick={onSearchPackClick}>Search</button>
			<button className={style.addNewPack} onClick={onAddNewPackClick}>Add new pack</button>
		</>
	)
}
