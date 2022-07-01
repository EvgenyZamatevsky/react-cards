import React, { FC } from 'react'
import { ReturnComponentType } from 'types'
import style from './Packs.module.scss'

export type PacksPropsType = {

}

export const Packs: FC<PacksPropsType> = (): ReturnComponentType => {
	return (
		<div className={style.packs}>
			<div className={style.container}>
				<div className={style.navbar}>
					<div className={style.title}>Show packs cards</div>
					<div className={style.showPacks}>
						<button className={style.my}>My</button>
						<button className={style.all}>All</button>
					</div>
					<div className={style.text}>Numbers of cards</div>
					<input className={style.doubleRange} type='range' />
				</div>
				<div className={style.content}>
					<h2>Packs list</h2>
					<input className={style.search} type="text" placeholder='Search' />
					<button className={style.addNewPack}>Add new pack</button>
					<div className={style.table}>
						<div className={style.info}>
							<div className={style.infoName}>Name</div>
							<div className={style.infoCards}>Cards</div>
							<div className={style.infoLastUpdated}>Last Updated</div>
							<div className={style.infoCreatedBy}>Created by</div>
							<div className={style.infoActions}>Actions</div>
						</div>
						<div className={style.pack}>
							<div className={style.packName}>pack Name</div>
							<div className={style.packCards}>0</div>
							<div className={style.packLastUpdated}>07.01.2022</div>
							<div className={style.packCreatedBy}>ZaM</div>
							<div className={style.packActions}>
								<button className={style.delete}>Delete</button>
								<button className={style.edit}>Edit</button>
								<button className={style.learn}>Learn</button>
							</div>
						</div>
						<div className={style.pagination}>
							pagination
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
