import React, { FC, ReactElement } from 'react'
import notFound from 'assets/images/notFound.png'
import { Path } from 'enums'
import style from './NotFound.module.scss'
import { Link } from 'react-router-dom'

export const NotFound: FC = (): ReactElement => {
	return (
		<div className={style.container}>
			<div className={style.content}>
				<div className={style.body}>
					<h2 className={style.title}>Ooops!</h2>
					<div className={style.text}>Sorry! Page not found!</div>
					<Link to={Path.HOME} className={style.backHomePageBtn}>Back to home page</Link>
				</div>
				<div>
					<img src={notFound} alt='not found' />
				</div>
			</div>
		</div>
	)
}
