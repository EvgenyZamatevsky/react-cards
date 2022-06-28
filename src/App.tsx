import React, { FC } from 'react'
import { Login, NewPassword, NotFound, PasswordRecovery, Profile, Registration } from 'components'
import { Path } from 'enums'
import { Route, Routes } from 'react-router-dom'
import { ReturnComponentType } from 'types'

export const App: FC = (): ReturnComponentType => {
  return (
    <div>
      <Routes>
        <Route path={Path.home} element={<Profile />} />
        <Route path={Path.login} element={<Login />} />
        <Route path={Path.newPassword} element={<NewPassword />} />
        <Route path={Path.passwordRecovery} element={<PasswordRecovery />} />
        <Route path={Path.registration} element={<Registration />} />
        <Route path={Path.notFound} element={<NotFound />} />
      </Routes>
    </div>
  )
}
