import axios from '../axios'
import { Bookmark, Group, User } from '../../types'
import { parseGroup } from '../parsers'

export interface ListQueryParams {
  for_user?: User['id']
  available_for_bookmark_detail?: Bookmark['details']['id']
}

export const list = (params: ListQueryParams = {}) =>
  axios
    .get<Group[]>('groups/', { params })
    .then((res) => res.data)
    .then((data) => data.map(parseGroup))
