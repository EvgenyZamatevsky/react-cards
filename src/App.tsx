import React, { FC, Suspense } from 'react'
import { ReturnComponentType } from 'types'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ROUTES } from 'router'
import { Header } from 'components'
import { Path } from 'enums'
import { TailSpin } from 'react-loader-spinner'

export const App: FC = (): ReturnComponentType => {

  const { pathname } = useLocation()

  return (
    <div className='app'>
      {(pathname === Path.PROFILE || pathname === Path.PACKS) && <Header />}
      <Suspense fallback={<TailSpin color='#EBE0E9' height={200} width={200} wrapperClass='preloader' />}>
        <Routes>
          {ROUTES.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
        </Routes>
      </Suspense>
    </div>
  )
}
