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
import { selectIsDisabled } from 'store/selectors'
import { setIsDisabled } from 'store/slices'

type SearchPropsType = {
	title?: string
	searchValue: string
	handleSetSearchValueChange: (value: string) => void
	handleResetSearchValueClick: (resetValue: string) => void
}

export const Search: FC<SearchPropsType> =
	({ title, searchValue, handleSetSearchValueChange, handleResetSearchValueClick }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const isDisabled = useSelector(selectIsDisabled)

		const [value, setValue] = useState(EMPTY_STRING)

		const inputRef = useRef<HTMLInputElement>(null)

		const updateSearchValue = useCallback(debounce((value: string): void => {
			handleSetSearchValueChange(value)
		}, 500), [])

		const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
			const currentValue = event.currentTarget.value

			if (currentValue && !isDisabled) {
				dispatch(setIsDisabled(true))
			}

			setValue(currentValue)
			updateSearchValue(currentValue)
		}

		const showInputFocus = (): void => inputRef.current?.focus()

		const onResetSearchValueClick = (): void => {
			setValue(EMPTY_STRING)
			handleResetSearchValueClick(EMPTY_STRING)
			showInputFocus()
		}

		return (
			<div>
				<div className={style.searchText}>{title}</div>
				<div className={style.search}>
					<img className={style.searchIcon} src={loon} />
					<input
						className={style.searchInput}
						placeholder='Provide your text'
						value={value}
						onChange={onInputChange}
						ref={inputRef} />
					{searchValue &&
						<button
							className={style.resetSearchValueBtn}
							onClick={onResetSearchValueClick}
							disabled={isDisabled}>
							<img className={style.clearIcon} src={cross} alt='cross' />
						</button>}
				</div>
			</div>
		)
	}
