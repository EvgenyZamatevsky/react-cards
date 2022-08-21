import React, { FC } from 'react'
import { Path } from 'enums'
import { BackToPage, InputFile, EditableItem, UniversalButton } from 'components'
import { useAppDispatch } from 'hooks'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { updateAuthorizedUserNameOrAvatar, logOut } from 'store/asyncActions'
import { selectIsAuth, selectAuthorizedUserName, selectAuthorizedUserEmail, selectIsDisabled } from 'store/selectors'
import { resetMinValueAndMaxValue } from 'store/slices'
import { ReturnComponentType } from 'types'
import logOutIcon from 'assets/icons/logOut.png'
import style from './Profile.module.scss'

export const Profile: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const isAuth = useSelector(selectIsAuth)
	const authorizedUserName = useSelector(selectAuthorizedUserName)
	const authorizedUserEmail = useSelector(selectAuthorizedUserEmail)
	const isDisabled = useSelector(selectIsDisabled)

	const handleUpdateNameBlurOrKeyDown = (updatedName: string): void => {
		dispatch(updateAuthorizedUserNameOrAvatar({ name: updatedName }))
	}

	const onLogOutClick = (): void => {
		dispatch(logOut())
	}

	const handleBackToPacksListClick = (): void => {
		navigate(Path.PACKS)
		dispatch(resetMinValueAndMaxValue())
	}

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<div className={style.profile}>

			<BackToPage
				title={'Back to Packs List'}
				onBackToPageClick={handleBackToPacksListClick}
			/>

			<div className={style.container}>
				<h2 className={style.title}>Personal Information</h2>
				<InputFile />

				<EditableItem
					currentValue={authorizedUserName}
					isDisabled={isDisabled}
					updateValue={handleUpdateNameBlurOrKeyDown}
				/>

				<div className={style.email}>{authorizedUserEmail}</div>
				<UniversalButton
					secondary
					onClick={onLogOutClick}
					disabled={isDisabled}
				>
					<img src={logOutIcon} alt='log Out' />
					Log out
				</UniversalButton>
			</div>
		</div>
	)
}
