import { Pagination } from 'components/common'
import { EMPTY_STRING } from 'constants/base'
import { Path } from 'enums'
import { useTypedDispatch } from 'hooks'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuth } from 'store/authReducer/selectors'
import { selectCardPacksTotalCount, selectPacks, selectPage, selectPageCount } from 'store/packsReducer/selectors'
import { getPacksTC } from 'store/packsReducer/thunks'
import { ReturnComponentType } from 'types'
import { Pack } from './Pack/Pack'
import { PackForm } from './PackForm'
import { PackNavBar } from './PackNavBar'
import style from './Packs.module.scss'

export type PacksPropsType = {

}

export const Packs: FC<PacksPropsType> = (): ReturnComponentType => {

	const dispatch = useTypedDispatch()

	const isAuth = useSelector(selectIsAuth)
	const packs = useSelector(selectPacks)
	const cardPacksTotalCount = useSelector(selectCardPacksTotalCount)
	const pageCount = useSelector(selectPageCount)
	const page = useSelector(selectPage)

	const [searchPack, setSearchPack] = useState<string>(EMPTY_STRING)

	const renderPacks = packs.map((pack) => <Pack key={pack._id} pack={pack} />)

	const handleSetCurrentPageClick = (page: number) => {
		dispatch(getPacksTC({ page: page }))
	}

	useEffect(() => {
		if (isAuth) {
			dispatch(getPacksTC({ packName: searchPack }))
		}
	}, [])

	if (!isAuth) {
		return <Navigate to={Path.login} />
	}

	return (
		<div className={style.packs}>
			<div className={style.container}>
				<PackNavBar />
				<div className={style.content}>
					<h2>Packs list</h2>
					<PackForm searchPack={searchPack} setSearchPack={setSearchPack} />
					<div className={style.table}>
						<div className={style.info}>
							<div className={style.infoName}>Name</div>
							<div className={style.infoCards}>Cards</div>
							<div className={style.infoLastUpdated}>Last Updated</div>
							<div className={style.infoCreatedBy}>Created by</div>
							<div className={style.infoActions}>Actions</div>
						</div>
						{renderPacks}
						<div className={style.pagination}>
							<Pagination
								totalItemsCount={cardPacksTotalCount}
								count={pageCount}
								currentPage={page}
								setCurrentPage={handleSetCurrentPageClick}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
