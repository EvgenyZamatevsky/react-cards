import React, { FC, useEffect } from 'react'
import { Login, NewPassword, NotFound, Forgot, Profile, Register, CheckEmail, ErrorAlert, Layout, Packs } from 'components'
import { Path } from 'enums'
import { Route, Routes } from 'react-router-dom'
import { ReturnComponentType } from 'types'
import { useTypedDispatch } from 'store/hooks'
import { useSelector } from 'react-redux'
import { selectIsInitialize, selectIsLoading } from 'store/selectors'
import { TailSpin } from 'react-loader-spinner'
import { initializeAppTC } from 'store/middlewares'

export const App: FC = (): ReturnComponentType => {

  const dispatch = useTypedDispatch()

  const isLoading = useSelector(selectIsLoading)
  const isInitialize = useSelector(selectIsInitialize)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialize) {
    return <TailSpin color='#9890C7' height={200} width={200} wrapperClass={'tail-spin'} />
  }

  return (
    <div>
      {isLoading && <TailSpin color='#9890C7' height={200} width={200} wrapperClass={'tail-spin'} />}
      <Routes>
        <Route path={Path.login} element={<Login />} />
        <Route path={`${Path.newPassword}/:token`} element={<NewPassword />} />
        <Route path={Path.forgot} element={<Forgot />} />
        <Route path={Path.register} element={<Register />} />
        <Route path={`${Path.checkEmail}/:email`} element={<CheckEmail />} />
        <Route path={Path.notFound} element={<NotFound />} />

        <Route path={Path.home} element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path={Path.packs} element={<Packs />} />
        </Route>

      </Routes>
      <ErrorAlert />
    </div>
  )
}
