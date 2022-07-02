import { useTypedDispatch } from 'hooks'
import React, { ChangeEvent, FC } from 'react'
import { getPacksTC } from 'store/packsReducer/thunks'
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

	return (
		<>
			<input className={style.search}
				type='text'
				placeholder='Search'
				value={searchPack}
				onChange={onSearchPackChange}
			/>
			<button onClick={onSearchPackClick}>Search</button>
			<button className={style.addNewPack}>Add new pack</button>
		</>
	)
}
