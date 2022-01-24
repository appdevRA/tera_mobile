import { Folder, User } from '../../types'
import axios from '../axios'
import { parseFolder } from '../parsers'

export interface ListQueryParams {
  user?: User['id']
}

export const list = (params: ListQueryParams = {}) =>
  axios
    .get<Folder[]>('folders/', { params })
    .then((res) => res.data)
    .then((data) => data.map((folder) => parseFolder(folder)))
