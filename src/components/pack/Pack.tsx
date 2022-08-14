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
import style from './Pack.module.scss'
import { convertDate } from 'utils'
import { Modal, ModalPack } from 'components/common/modals'
import { EMPTY_STRING } from 'constants/base'

type PackPropsType = {
	_id: string
	user_id: string
	name: string
	cardsCount: number
	updated: Date
	user_name: string
	isDisabled: boolean
}

export const Pack: FC<PackPropsType> =
	({ _id, user_id, name, cardsCount, updated, user_name, isDisabled }): ReturnComponentType => {

		const dispatch = useAppDispatch()

		const navigate = useNavigate()

		const authorizedUserData = useSelector(selectAuthorizedUserData)

		const [isModalActive, setIsModalActive] = useState(false)
		const [updatedPackName, setUpdatedPackName] = useState(EMPTY_STRING)

		const isOwner = authorizedUserData?._id === user_id

		const resetModalValues = (): void => {
			setIsModalActive(false)
			setUpdatedPackName(EMPTY_STRING)
		}

		const onUpdatedPackNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
			setUpdatedPackName(event.currentTarget.value)
		}

		const handleRemovePackClick = (): void => {
			dispatch(removePack(_id))
		}

		const onUpdatePackNameClick = (): void => {
			dispatch(updatePackName({ _id, name: updatedPackName }))
			resetModalValues()
		}

		const handleDeactivateModalClick = (): void => resetModalValues()

		const handleActivateModalClick = (): void => setIsModalActive(true)

		return (
			<>
				<Modal isModalActive={isModalActive} onDeactivateModalClick={handleDeactivateModalClick}>
					<ModalPack
						value={updatedPackName}
						onInputChange={onUpdatedPackNameChange}
						onDeactivateModalClick={handleDeactivateModalClick}
						onSaveClick={onUpdatePackNameClick}
						title={'Edit pack'}
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
							<button className={style.teacher} disabled>
								<img src={teacher} alt='teacher' />
							</button>
							{isOwner &&
								<Actions
									isDisabled={isDisabled}
									onRemoveItemClick={handleRemovePackClick}
									onUpdateItemClick={handleActivateModalClick}
								/>
							}
						</div>
					</div>
				</div>
			</>
		)
	}
