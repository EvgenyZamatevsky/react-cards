import React, { FC, Suspense } from 'react'
import { ReturnComponentType } from 'types'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from 'router'
import { Header } from 'components'

export const App: FC = (): ReturnComponentType => {
  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          {ROUTES.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
        </Routes>
      </Suspense>
    </div>
  )
}
