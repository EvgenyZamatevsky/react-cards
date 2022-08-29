import React, { FC, memo, useCallback, useRef, useState } from 'react'
import { removePack, updatePackName } from 'store/asyncActions/packs'
import { useAppDispatch } from 'hooks'
import { ReturnComponentType } from 'types'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserId } from 'store/selectors'
import { Link } from 'react-router-dom'
import { Path } from 'enums'
import { Actions } from 'components/common/actions'
import { convertDate } from 'utils'
import { Modal, ModalDelete, ModalPack } from 'components/common/modals'
import { EMPTY_STRING, ERROR_MESSAGE } from 'constants/base'
import { PackPropsType } from './types'
import style from './Pack.module.scss'

export const Pack: FC<PackPropsType> =
	memo(({ userId, userName, packId, packName, cardsCount, packUpdated, isDisabled }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const authorizedUserId = useSelector(selectAuthorizedUserId)

		const [isPackModalActive, setIsPackModalActive] = useState(false)
		const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
		const [updatedPackName, setUpdatedPackName] = useState(EMPTY_STRING)
		const [errorMessage, setErrorMessage] = useState(EMPTY_STRING)

		const updatedPackNameInputRef = useRef<HTMLInputElement>(null)

		const isOwner = authorizedUserId === userId
		const currentDate = convertDate(packUpdated)

		const resetPackModalValues = (): void => {
			setIsPackModalActive(false)
			setErrorMessage(EMPTY_STRING)

			if (updatedPackName !== packName) {
				setUpdatedPackName(packName)
			}
		}

		const handleRemovePackClick = (): void => {
			dispatch(removePack({ packId, authorizedUserId: userId }))
			setIsDeleteModalActive(false)
		}

		const handleUpdatePackNameClick = (): void => {
			const updatedPackNameTrimmed = updatedPackName.trim()
			const packNameTrimmed = packName.trim()

			if (updatedPackNameTrimmed !== EMPTY_STRING) {
				if (updatedPackNameTrimmed !== packNameTrimmed) {
					dispatch(updatePackName({ authorizedUserId: userId, packId, updatedPackName: updatedPackNameTrimmed }))
				}

				setIsPackModalActive(false)
			} else {
				setErrorMessage(ERROR_MESSAGE)
			}
		}

		const handleDeactivatePackModalClick = (): void => resetPackModalValues()

		const handleDeactivateDeleteModalClick = (): void => setIsDeleteModalActive(false)

		const handleActivatePackModalClick = useCallback((): void => {
			setIsPackModalActive(true)
			setUpdatedPackName(packName)
			updatedPackNameInputRef.current?.focus()
		}, [])

		const handleActivateDeleteModalClick = useCallback((): void => {
			setIsDeleteModalActive(true)
		}, [])

		return (
			<>
				<Modal
					isModalActive={isPackModalActive}
					onDeactivateModalClick={handleDeactivatePackModalClick}
				>
					<ModalPack
						value={updatedPackName}
						setUpdatedPackName={setUpdatedPackName}
						onDeactivateModalClick={handleDeactivatePackModalClick}
						onSaveClick={handleUpdatePackNameClick}
						title={'Edit pack'}
						errorMessage={errorMessage}
						setErrorMessage={setErrorMessage}
						ref={updatedPackNameInputRef}
					/>
				</Modal>

				<Modal
					isModalActive={isDeleteModalActive}
					onDeactivateModalClick={handleDeactivateDeleteModalClick}
				>
					<ModalDelete
						title={'Delete Pack'}
						name={packName}
						onDeactivateModalClick={handleDeactivateDeleteModalClick}
						onDeleteClick={handleRemovePackClick}
					/>
				</Modal>

				<div className={style.container}>
					<div className={style.list}>
						<Link
							to={`${Path.CARDS}/${packId}`}
							className={`${style.name} ${isDisabled && style.disabledLink}`}
						>
							{packName}
						</Link>
						<div className={style.cardsCount}>{cardsCount}</div>
						<div className={style.updated}>{currentDate}</div>
						<div className={style.userName}>{userName}</div>
						<Actions
							onActivateDeleteModalClick={handleActivateDeleteModalClick}
							onActivateEditModalClick={handleActivatePackModalClick}
							cardsCount={cardsCount}
							packId={packId}
							isOwner={isOwner}
						/>
					</div>
				</div>
			</>
		)
	})
