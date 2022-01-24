import { Bookmark, Folder, Group, User } from '../../types'
import axios from '../axios'
import { parseBookmark } from '../parsers'

export interface ListQueryParams {
  folder?: Folder['id']
  filter?: 'recently added' | 'recently read' | 'favorites' | 'trash'
  group?: Group['id']
  user?: User['id']
  groups_only?: boolean
}

const FilterParamsMap = {
  'recently added': { recently_added: true },
  'recently read': { recently_read: true },
  favorites: { favorite: true },
  trash: { removed: true },
}

export const list = (params: ListQueryParams = {}) => {
  return axios
    .get<Bookmark[]>('bookmarks/', {
      params: params.filter
        ? { ...FilterParamsMap[params.filter], ...params }
        : params,
    })
    .then((res) => res.data)
    .then((data) => data.map((folder) => parseBookmark(folder)))
}

export const destroy = (id: Bookmark['id']) => axios.delete(`bookmarks/${id}/`)

export const unarchive = (id: Bookmark['id']) =>
  axios.post(`bookmarks/${id}/unarchive/`)

export const toggleFavorite = (id: Bookmark['id']) =>
  axios.post(`bookmarks/${id}/toggle-favorite/`)

export const addToFolder = (
  id: Bookmark['id'],
  folderIds: Array<Folder['id']>
) => axios.patch(`bookmarks/${id}/`, { folders: folderIds })

export const addToGroup = (
  id: Bookmark['details']['id'],
  group_id: Group['id'],
  user_id: User['id']
) => axios.post(`bookmark-details/${id}/add-to-group/`, { group_id, user_id })

export const updateDateAccessed = (id: Bookmark['id']) =>
  axios.patch(`bookmarks/${id}/`, { dateAccessed: new Date() })
