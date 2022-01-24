import { User } from '../../types'
import axios from '../axios'

const resource = 'users'

export interface LoginRequestBody {
  username: string
  password: string
}

export const login = (body: LoginRequestBody) =>
  axios.post<User>(`${resource}/login/`, body).then((res) => res.data)

export interface ChangePasswordRequestBody {
  password: string
  confirmPassword: string
}

export const changePassword = (
  userId: User['id'],
  { confirmPassword, password }: ChangePasswordRequestBody
) =>
  axios.post<User>(`${resource}/${userId}/change-password/`, {
    password,
    confirm_password: confirmPassword,
  })
