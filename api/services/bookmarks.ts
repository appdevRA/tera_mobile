import { Bookmark, Folder } from '../../types'
import axios from '../axios'
import { parseBookmark } from '../parsers'

export interface Params {
  folder?: number
  filter?: 'recently added' | 'recently read' | 'favorites' | 'trash'
}

const FilterParamsMap = {
  'recently added': { recently_added: true },
  'recently read': { recently_read: true },
  favorites: { favorite: true },
  trash: { removed: true },
}

export const list = (params: Params = {}) => {
  return axios
    .get<Bookmark[]>('user-bookmarks/', {
      params:
        params.folder || !params.filter
          ? params
          : FilterParamsMap[params.filter],
    })
    .then((res) => res.data)
    .then((data) => data.map((folder) => parseBookmark(folder)))
}

export const destroy = (id: Bookmark['id']) =>
  axios.delete(`user-bookmarks/${id}/`)

export const toggleFavorite = (id: Bookmark['id']) =>
  axios.post(`user-bookmarks/${id}/toggle-favorite/`)

export const addToFolder = (
  id: Bookmark['id'],
  folderIds: Array<Folder['id']>
) => axios.patch(`user-bookmarks/${id}/`, { folders: folderIds })

export const updateDateAccessed = (id: Bookmark['id']) =>
  axios.patch(`user-bookmarks/${id}/`, { dateAccessed: new Date() })
