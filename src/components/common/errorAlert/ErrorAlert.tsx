import React, { FC, memo, useEffect } from 'react'
import { EMPTY_STRING } from 'constants/base'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'hooks'
import { selectErrorMessage } from 'store/selectors/app'
import { setErrorMessage } from 'store/slices/app'
import { ReturnComponentType } from 'types/ReturnComponentType'
import { UniversalButton } from '../universalButton'
import style from './ErrorAlert.module.scss'

const DELAY = 3000

export const ErrorAlert: FC = memo((): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const errorMessage = useSelector(selectErrorMessage)

	const onDeactivateErrorAlertAndResetErrorMessageClick = (): void => {
		dispatch(setErrorMessage(EMPTY_STRING))
	}

	useEffect(() => {
		if (errorMessage) {
			const timerId = setTimeout(() => {
				onDeactivateErrorAlertAndResetErrorMessageClick()
			}, DELAY)

			return (() => {
				clearTimeout(timerId)
			})
		}
	}, [errorMessage])

	return (
		<div className={`${style.errorAlert} ${!errorMessage && style.closeErrorAlert}`}>
			<div className={style.alert}>{errorMessage}</div>
			<UniversalButton onClick={onDeactivateErrorAlertAndResetErrorMessageClick}>&#10006;</UniversalButton>
		</div>
	)
})
