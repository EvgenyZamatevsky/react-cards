import React, { FC, memo, useCallback, useRef, useState } from 'react'
import { removePack, updatePackName } from 'store/asyncActions/packs'
import { useAppDispatch } from 'hooks'
import { ReturnComponentType } from 'types'
import { useSelector } from 'react-redux'
import { selectAuthorizedUserId } from 'store/selectors'
import { Link } from 'react-router-dom'
import { Path } from 'enums'
import { convertDate } from 'utils'
import { Modal, ModalDelete, ModalPack } from 'components/common/modals'
import { EMPTY_STRING, ERROR_MESSAGE } from 'constants/base'
import { PackPropsType } from './types'
import style from './Pack.module.scss'
import cart from 'assets/icons/cart.svg'
import teacher from 'assets/icons/teacher.svg'
import pencil from 'assets/icons/pencil.svg'
import { UniversalButton } from 'components/common'

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

		const onActivatePackModalClick = useCallback((): void => {
			setIsPackModalActive(true)
			setUpdatedPackName(packName)
			updatedPackNameInputRef.current?.focus()
		}, [])

		const onActivateDeleteModalClick = useCallback((): void => {
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

				<tbody className={style.tbody}>
					<tr className={style.tr}>
						<td className={style.td}>
							<Link to={`${Path.CARDS}/${packId}`} className={`${style.name} ${isDisabled && style.disabledLink}`}>
								{packName}
							</Link>
						</td>
						<td className={style.td}>{cardsCount}</td>
						<td className={style.td}>{currentDate}</td>
						<td className={style.td}>{userName}</td>
						<td className={style.td}>
							<div className={style.actions}>
								<Link
									to={`${Path.LEARN}/${packId}`}
									className={`${style.teacher} ${(isDisabled || cardsCount === 0) && style.disabledLink}`}
								>
									<img src={teacher} alt='teacher' />
								</Link>

								{isOwner &&
									<>
										<UniversalButton onClick={onActivateDeleteModalClick} disabled={isDisabled}>
											<img src={cart} alt='cart' />
										</UniversalButton>
										<UniversalButton onClick={onActivatePackModalClick} disabled={isDisabled}>
											<img src={pencil} alt='pencil' />
										</UniversalButton>
									</>}
							</div>
						</td>
					</tr>
				</tbody>
			</>
		)
	})
