import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import loon from 'assets/icons/loon.svg'
import cross from 'assets/icons/cross.svg'
import { useAppDispatch } from 'hooks'
import { EMPTY_STRING } from 'constants/base'
import debounce from 'lodash.debounce'
import { useSelector } from 'react-redux'
import { selectIsDisabled } from 'store/selectors'
import { setIsDisabled } from 'store/slices'
import style from './Search.module.scss'
import { SearchPropsType } from './types'
import { UniversalButton } from '../universalButton'
import { UniversalInput } from '../universalInput'

export const Search: FC<SearchPropsType> =
	({ title, searchValue, handleSetSearchValueChange, handleResetSearchValueClick }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const isDisabled = useSelector(selectIsDisabled)

		const [value, setValue] = useState(searchValue)

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
					<UniversalInput
						className={style.searchInput}
						placeholder='Provide your text'
						value={value}
						onChange={onInputChange}
						ref={inputRef} />
					{searchValue &&
						<UniversalButton
							className={style.resetSearchValueBtn}
							onClick={onResetSearchValueClick}
							disabled={isDisabled}>
							<img className={style.clearIcon} src={cross} alt='cross' />
						</UniversalButton>}
				</div>
			</div>
		)
	}
