import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { EMPTY_STRING } from 'constants/base'
import { ReturnComponentType } from 'types/ReturnComponentType'
import style from './Pagination.module.scss'

type PaginationPropsType = {
	totalItemsCount: number,
	count: number
	currentPage: number
	handleSetCurrentPageClick: (currentPage: number) => void
	handleSetPageCountChange: (pageCount: number) => void
	portionSize?: number
}

export const Pagination: FC<PaginationPropsType> =
	memo(({
		totalItemsCount,
		count,
		currentPage,
		handleSetCurrentPageClick,
		handleSetPageCountChange,
		portionSize = 10
	}): ReturnComponentType => {

		const [portionNumber, setPortionNumber] = useState<number>(1)

		const pagesCount = Math.ceil(totalItemsCount / count)
		const pages = []
		const portionCount = Math.ceil(pagesCount / portionSize)
		const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
		const rightPortionPageNumber = portionNumber * portionSize

		for (let i = 1; i < pagesCount; i++) {
			pages.push(i)
		}

		useEffect(() => {
			setPortionNumber(Math.ceil(currentPage / portionSize))
		}, [currentPage])

		const onDecreasePortionNumberClick = (): void => setPortionNumber(portionNumber - 1)

		const onIncreasePortionNumberClick = (): void => setPortionNumber(portionNumber + 1)

		const onSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
			handleSetPageCountChange(Number(event.currentTarget.value))
		}

		return (
			<div className={style.pagination}>

				<div className={style.container}>
					{portionNumber > 1 && <button onClick={onDecreasePortionNumberClick}>&laquo;</button>}

					{pages
						.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
						.map(page => {

							const onSetCurrentPageClick = (): void => handleSetCurrentPageClick(page)

							return (
								<button
									key={page}
									className={currentPage === page ? style.active : EMPTY_STRING}
									onClick={onSetCurrentPageClick}>
									{page}
								</button>
							)
						})}

					{portionCount > portionNumber && <button onClick={onIncreasePortionNumberClick}>&raquo;</button>}
					{totalItemsCount >= 26 && <div className={style.showContainer}>
						Show
						<select className={style.select} onChange={onSelectChange}>
							<option value={'5'}>5</option>
							<option value={'25'}>25</option>
							<option value={'50'}>50</option>
							<option value={'100'}>100</option>
						</select>
						Cards per Page
					</div>}
				</div>
			</div>
		)
	})
