import React, { FC, Suspense, useEffect } from 'react'
import { ReturnComponentType } from 'types'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ROUTES } from 'router'
import { ErrorAlert, Header, Preloader } from 'components'
import { getAuthorizedUserData } from 'store/asyncActions'
import { useSelector } from 'react-redux'
import { selectIsInitializedApp, selectIsLoading } from 'store/selectors/app'
import { Path } from 'enums'
import { useAppDispatch } from 'hooks'

export const App: FC = (): ReturnComponentType => {

  const dispatch = useAppDispatch()

  const { pathname } = useLocation()

  const isInitializedApp = useSelector(selectIsInitializedApp)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(getAuthorizedUserData())
  }, [])

  if (!isInitializedApp) {
    return <Preloader />
  }

  return (
    <div className='app'>
      <ErrorAlert />
      {isLoading && <Preloader />}
      {pathname !== Path.NOT_FOUND_404 && <Header />}
      <div className='container'>
        <Suspense fallback={<Preloader />}>
          <Routes>
            {ROUTES.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
