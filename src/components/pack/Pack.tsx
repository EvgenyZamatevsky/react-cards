import React, { FC, useRef, useState } from 'react'
import { removePack, updatePackName } from 'store/asyncActions/packs'
import { useAppDispatch } from 'hooks'
import { ReturnComponentType } from 'types'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserId } from 'store/selectors'
import { useNavigate } from 'react-router-dom'
import { Path } from 'enums'
import { Actions } from 'components/common/actions'
import { convertDate } from 'utils'
import { Modal, ModalDelete, ModalPack } from 'components/common/modals'
import { EMPTY_STRING, ERROR_MESSAGE } from 'constants/base'
import style from './Pack.module.scss'
import { PackPropsType } from './types'
import { UniversalButton } from 'components/common/universalButton'

export const Pack: FC<PackPropsType> =
	({ userId, userName, packId, packName, cardsCount, packUpdated, isDisabled }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const navigate = useNavigate()

		const authorizedUserId = useSelector(selectAuthorizedUserId)

		const [isPackModalActive, setIsPackModalActive] = useState(false)
		const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
		const [updatedPackName, setUpdatedPackName] = useState(EMPTY_STRING)
		const [errorMessage, setErrorMessage] = useState(EMPTY_STRING)

		const updatedPackNameInputRef = useRef<HTMLInputElement>(null)

		const isOwner = authorizedUserId === userId

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

		const handleActivatePackModalClick = (): void => {
			setIsPackModalActive(true)
			setUpdatedPackName(packName)
			updatedPackNameInputRef.current?.focus()
		}

		const handleActivateDeleteModalClick = (): void => setIsDeleteModalActive(true)

		const onGoToCardsPageClick = (): void => {
			navigate(`${Path.CARDS}/${packId}`)
		}

		return (
			<>
				<Modal isModalActive={isPackModalActive} onDeactivateModalClick={handleDeactivatePackModalClick}>
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
				<Modal isModalActive={isDeleteModalActive} onDeactivateModalClick={handleDeactivateDeleteModalClick}>
					<ModalDelete
						title={'Delete Pack'}
						name={packName}
						onDeactivateModalClick={handleDeactivateDeleteModalClick}
						onDeleteClick={handleRemovePackClick}
					/>
				</Modal>
				<div className={style.container}>
					<div className={style.list}>
						<UniversalButton
							className={style.name}
							onClick={onGoToCardsPageClick}
							disabled={isDisabled}
						>
							{packName}
						</UniversalButton>
						<div className={style.cardsCount}>{cardsCount}</div>
						<div className={style.updated}>{convertDate(packUpdated)}</div>
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
	}
