import { getHttp } from '../helpers/http'

export const getUsers = () => {
  return getHttp('/users')
}
