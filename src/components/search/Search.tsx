import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import style from './Search.module.scss'
import loon from 'assets/icons/loon.svg'
import cross from 'assets/icons/cross.svg'
import { useAppDispatch } from 'store/hooks'
import { setSearchValue } from 'store/slices/packs'
import { EMPTY_STRING } from 'constants/base'
import debounce from 'lodash.debounce'
import { useSelector } from 'react-redux'
import { selectIsLoading, selectSearchValue } from 'store/selectors'

type SearchPropsType = {

}

export const Search: FC<SearchPropsType> = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const searchValue = useSelector(selectSearchValue)
	const isLoading = useSelector(selectIsLoading)

	const [value, setValue] = useState(EMPTY_STRING)

	const inputRef = useRef<HTMLInputElement>(null)

	const updateSearchValue = useCallback(debounce((value: string) => {
		dispatch(setSearchValue(value))
	}, 500), [])

	const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const currentValue = event.currentTarget.value

		setValue(currentValue)
		updateSearchValue(currentValue)
	}

	const showInputFocus = (): void => inputRef.current?.focus()

	const onResetSearchValueClick = (): void => {
		setValue(EMPTY_STRING)
		dispatch(setSearchValue(EMPTY_STRING))
		showInputFocus()
	}

	return (
		<div className={style.search}>
			<img className={style.searchIcon} src={loon} />
			<input
				className={style.searchInput}
				placeholder='Search'
				value={value}
				onChange={onInputChange}
				ref={inputRef} />
			{!isLoading && searchValue &&
				<img className={style.clearIcon} onClick={onResetSearchValueClick} src={cross} alt='cross' />}
		</div>
	)
}
