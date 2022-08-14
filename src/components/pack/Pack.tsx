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
import { Modal } from 'components/common/modal'
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

		const onUpdatedPackNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
			setUpdatedPackName(event.currentTarget.value)
		}

		const handleRemovePackClick = (): void => {
			dispatch(removePack(_id))
		}

		const onUpdatePackNameClick = (): void => {
			dispatch(updatePackName({ _id, name: updatedPackName }))
		}

		const onDeactivateModalClick = (): void => setIsModalActive(false)

		const onActivateModalClick = (): void => setIsModalActive(true)

		return (
			<>
				<Modal isModalActive={isModalActive} onDeactivateModalClick={onDeactivateModalClick}>
					<input type='text' placeholder='text...' value={updatedPackName} onChange={onUpdatedPackNameChange} />
					<button onClick={onDeactivateModalClick}>Cancel</button>
					<button onClick={onUpdatePackNameClick}>Save</button>
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
									onUpdateItemClick={onActivateModalClick}
								/>
							}
						</div>
					</div>
				</div>
			</>
		)
	}
