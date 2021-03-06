import { Bookmark, Folder, Group } from '../types'

export const parseFolder = (folder: Folder): Folder => ({
  ...folder,
  date_created: new Date(folder.date_created),
})

export const parseBookmark = (bookmark: Bookmark): Bookmark => ({
  ...bookmark,
  dateAdded: new Date(bookmark.dateAdded),
  dateAccessed: new Date(bookmark.dateAccessed),
  date_removed: bookmark.date_removed ? new Date(bookmark.date_removed) : null,
})

export const parseGroup = (group: Group): Group => ({
  ...group,
  date_created: new Date(group.date_created),
})
