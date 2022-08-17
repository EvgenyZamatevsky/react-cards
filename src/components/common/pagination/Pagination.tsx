import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { EMPTY_STRING } from 'constants/base'
import { ReturnComponentType } from 'types/ReturnComponentType'
import style from './Pagination.module.scss'
import { PageCountValueType, PaginationPropsType } from './types'

const pageCountValues: PageCountValueType[] = [
	{ value: '5', count: 5 },
	{ value: '25', count: 25 },
	{ value: '50', count: 50 },
	{ value: '100', count: 100 },
]

export const Pagination: FC<PaginationPropsType> =
	memo(({
		totalItemsCount,
		pageCount,
		page,
		handleSetPageClick,
		handleSetPageCountChange,
		portionSize = 10,
	}): ReturnComponentType => {

		const [portionNumber, setPortionNumber] = useState(1)

		const pagesCount = Math.ceil(totalItemsCount / pageCount)
		const pages = []
		const portionCount = Math.ceil(pagesCount / portionSize)
		const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
		const rightPortionPageNumber = portionNumber * portionSize

		for (let i = 1; i < pagesCount; i++) {
			pages.push(i)
		}

		useEffect(() => {
			setPortionNumber(Math.ceil(page / portionSize))
		}, [page])

		const onDecreasePortionNumberClick = (): void => setPortionNumber(portionNumber - 1)

		const onIncreasePortionNumberClick = (): void => setPortionNumber(portionNumber + 1)

		const onSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
			handleSetPageCountChange(Number(event.currentTarget.value))
		}

		return (
			<div className={style.pagination}>

				<div className={style.container}>
					{totalItemsCount >= 11 &&
						<>
							{portionNumber > 1 && <button onClick={onDecreasePortionNumberClick}>&laquo;</button>}

							{pages
								.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
								.map(p => {

									const onSetPageClick = (): void => handleSetPageClick(p)

									return (
										<button
											key={p}
											className={page === p ? style.active : EMPTY_STRING}
											onClick={onSetPageClick}>
											{p}
										</button>
									)
								})}

							{portionCount > portionNumber && <button onClick={onIncreasePortionNumberClick}>&raquo;</button>}
						</>}
					{totalItemsCount >= 26 &&
						<div className={style.showContainer}>
							Show
							<select defaultValue={pageCount} className={style.select} onChange={onSelectChange}>
								{pageCountValues.map(({ value, count }) => <option key={value} value={value}>{count}</option>)}
							</select>
							Cards per Page
						</div>}
				</div>
			</div>
		)
	})
