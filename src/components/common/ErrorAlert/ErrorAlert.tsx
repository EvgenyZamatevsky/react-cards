import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setErrorAC } from 'store/actions'
import { useTypedDispatch } from 'store/hooks'
import { selectError } from 'store/selectors'
import { ReturnComponentType } from 'types/ReturnComponentType'
import style from './ErrorAlert.module.scss'

export const ErrorAlert: FC = (): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const error = useSelector(selectError)

	const onCloseErrorAlertClick = (): void => {
		dispatch(setErrorAC(null))
	}

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				dispatch(setErrorAC(null))
			}, 3000)
		}
	}, [error])

	return (
		<div className={`${style.errorAlert} ${!error && style.closeErrorAlert}`}>
			<div className={style.alert}>{error}</div>
			<button onClick={onCloseErrorAlertClick}>&#10006;</button>
		</div>
	)
}
