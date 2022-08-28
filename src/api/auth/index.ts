import { instance } from 'api/config'
import { AuthorizedUserDataType, PayloadType, UpdatedAuthorizedUserResponseType } from './types'

const message = `
<div 
style='background-color: lime 
padding: 15px'>
password recovery link: <a href='http://localhost:3000/#/new-password/$token$'>link</a>
</div>`

export const AUTH = {
  register(email: string, password: string) {
    return instance.post('auth/register', { email, password })
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<AuthorizedUserDataType>('auth/login', { email, password, rememberMe })
  },
  me() {
    return instance.post<AuthorizedUserDataType>('auth/me')
  },
  logOut() {
    return instance.delete('auth/me')
  },
  forgot(email: string) {
    return instance.post('auth/forgot', { email, message })
  },
  setNewPassword(updatedPassword: string, resetPasswordToken: string) {
    return instance.post('auth/set-new-password', { password: updatedPassword, resetPasswordToken })
  },
  updateAuthorizedUserNameOrAvatar(payload: PayloadType) {
    return instance.put<UpdatedAuthorizedUserResponseType>('auth/me', payload)
  },
}
