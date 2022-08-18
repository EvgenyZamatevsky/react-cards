import React, { ChangeEvent, FC, useState } from 'react'
import { removePack, updatePackName } from 'store/asyncActions/packs'
import { useAppDispatch } from 'store/hooks'
import { ReturnComponentType } from 'types'
import teacher from 'assets/icons/teacher.svg'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserData } from 'store/selectors'
import { useNavigate } from 'react-router-dom'
import { Path } from 'enums'
import { Actions } from 'components/common/actions'
import { convertDate } from 'utils'
import { Modal, ModalDelete, ModalPack } from 'components/common/modals'
import { EMPTY_STRING, ERROR_MESSAGE } from 'constants/base'
import style from './Pack.module.scss'
import { PackPropsType } from './types'

export const Pack: FC<PackPropsType> =
	({ _id, user_id, name, cardsCount, updated, user_name, isDisabled }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const navigate = useNavigate()

		const authorizedUserData = useSelector(selectAuthorizedUserData)

		const [isPackModalActive, setIsPackModalActive] = useState(false)
		const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
		const [updatedPackName, setUpdatedPackName] = useState(EMPTY_STRING)
		const [errorMessage, setErrorMessage] = useState(EMPTY_STRING)

		const isOwner = authorizedUserData?._id === user_id

		const resetPackModalValues = (): void => {
			setIsPackModalActive(false)
			setErrorMessage(EMPTY_STRING)

			if (updatedPackName !== name) {
				setUpdatedPackName(name)
			}
		}

		const onUpdatedPackNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
			setUpdatedPackName(event.currentTarget.value)
			setErrorMessage(EMPTY_STRING)
		}

		const handleRemovePackClick = (): void => {
			dispatch(removePack(_id))
			setIsDeleteModalActive(false)
		}

		const handleUpdatePackNameClick = (): void => {
			if (updatedPackName !== name) {
				dispatch(updatePackName({ _id, name: updatedPackName }))
			}

			setIsPackModalActive(false)
		}

		const onUpdatePackNameClick = (): void => {
			const updatedPackNameTrimmed = updatedPackName.trim()

			if (updatedPackNameTrimmed !== EMPTY_STRING) {
				handleUpdatePackNameClick()
			} else {
				setErrorMessage(ERROR_MESSAGE)
			}
		}

		const handleDeactivatePackModalClick = (): void => resetPackModalValues()

		const handleDeactivateDeleteModalClick = (): void => setIsDeleteModalActive(false)

		const handleActivatePackModalClick = (): void => {
			setIsPackModalActive(true)
			setUpdatedPackName(name)
		}

		const handleActivateDeleteModalClick = (): void => setIsDeleteModalActive(true)

		return (
			<>
				<Modal isModalActive={isPackModalActive} onDeactivateModalClick={handleDeactivatePackModalClick}>
					<ModalPack
						value={updatedPackName}
						onInputChange={onUpdatedPackNameChange}
						onDeactivateModalClick={handleDeactivatePackModalClick}
						onSaveClick={onUpdatePackNameClick}
						title={'Edit pack'}
						errorMessage={errorMessage}
					/>
				</Modal>
				<Modal isModalActive={isDeleteModalActive} onDeactivateModalClick={handleDeactivateDeleteModalClick}>
					<ModalDelete
						title={'Delete Pack'}
						name={name}
						onDeactivateModalClick={handleDeactivateDeleteModalClick}
						onDeleteClick={handleRemovePackClick}
					/>
				</Modal>
				<div className={style.container}>
					<div className={style.list}>
						<button
							className={style.name}
							onClick={() => navigate(`${Path.CARDS}/${_id}`)}
							disabled={isDisabled}
						>
							{name}
						</button>
						<div className={style.cardsCount}>{cardsCount}</div>
						<div className={style.updated}>{convertDate(updated)}</div>
						<div className={style.userName}>{user_name}</div>
						<div className={isOwner ? style.actions : style.secondaryActions}>
							<button
								className={style.teacher}
								onClick={() => navigate(`/learn/${_id}`)}
								disabled={cardsCount === 0}
							>
								<img src={teacher} alt='teacher' />
							</button>
							{isOwner &&
								<Actions
									isDisabled={isDisabled}
									onActivateDeleteModalClick={handleActivateDeleteModalClick}
									onActivateEditModalClick={handleActivatePackModalClick}
								/>
							}
						</div>
					</div>
				</div>
			</>
		)
	}
