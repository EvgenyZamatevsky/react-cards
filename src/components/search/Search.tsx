import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { ReturnComponentType } from 'types'
import style from './Search.module.scss'
import loon from 'assets/icons/loon.svg'
import cross from 'assets/icons/cross.svg'
import { useSelector } from 'react-redux'
import { selectSearchValue } from 'store/selectors'
import { useAppDispatch } from 'store/hooks'
import { setSearchValue } from 'store/slices/packs'
import { useDebounce } from 'hooks/useDebounce'
import { EMPTY_STRING } from 'constants/base'

type SearchPropsType = {

}

export const Search: FC<SearchPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const [value, setValue] = useState(EMPTY_STRING)
	const debouncedValue = useDebounce<string>(value, 1000)

	const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setValue(event.currentTarget.value)
	}

	// const searchValue = useSelector(selectSearchValue)

	useEffect(() => {
		setValue(debouncedValue)

		dispatch(setSearchValue(value))
	}, [debouncedValue])

	return (
		<div className={style.search}>
			<img className={style.searchIcon} src={loon} />
			<input className={style.searchInput} placeholder='Search' value={value} onChange={onInputChange} />
			{3 > 2 && <img className={style.clearIcon} src={cross} alt='cross' />}
		</div>
	)
}
