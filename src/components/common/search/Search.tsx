import React, { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react'
import { ReturnComponentType } from 'types'
import { useAppDispatch, useDebounce } from 'hooks'
import { EMPTY_STRING } from 'constants/base'
import { setIsDisabled } from 'store/slices'
import { SearchPropsType } from './types'
import { UniversalButton } from '../universalButton'
import { UniversalInput } from '../universalInput'
import search from 'assets/icons/search.svg'
import cross from 'assets/icons/cross.svg'
import style from './Search.module.scss'

export const Search: FC<SearchPropsType> =
	memo(({ searchValue, isDisabled, handleSetSearchValueChange, handleResetSearchValueClick }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const [value, setValue] = useState(searchValue)

		const debouncedValue = useDebounce(value, 700)

		const inputRef = useRef<HTMLInputElement>(null)
		const isMounted = useRef(false)

		useEffect(() => {
			if (isMounted.current) {
				handleSetSearchValueChange(debouncedValue)
			}

			isMounted.current = true
		}, [debouncedValue])

		const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
			const currentValue = event.currentTarget.value
			setValue(currentValue)

			if (currentValue && !isDisabled) {
				dispatch(setIsDisabled(true))
			}
		}

		const onResetSearchValueClick = (): void => {
			setValue(EMPTY_STRING)
			handleResetSearchValueClick(EMPTY_STRING)
			inputRef.current?.focus()
		}

		return (
			<div className={style.container}>
				<img className={style.searchIcon} src={search} />
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
						<img className={style.crossIcon} src={cross} alt='cross' />
					</UniversalButton>}
			</div>
		)
	})
