import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamList = {
  Login: undefined
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  AccountSettings: undefined
  ChangePassword: undefined
}

export type RootTabParamList = {
  'My Collections': {
    filter?: 'recently added' | 'recently read' | 'favorites' | 'trash'
  }
  'My Folders': undefined
  'Private Groups': undefined
}

export type Screen =
  | 'foldersList'
  | 'folderDetail'
  | 'allReferences'
  | 'recentlyAdded'
  | 'recentlyRead'
  | 'favorites'
  | 'trash'
  | 'groupsList'
  | 'groupDetail'

export interface Folder {
  id: number
  name: string
  date_created: Date
  user: number
}
export interface Group {
  id: number
  name: string
  date_created: Date
  is_removed: number
  owner: number
  member: number[]
}

export interface Bookmark {
  id: number
  details: Details
  isFavorite: boolean
  dateAccessed: Date
  dateAdded: Date
  isRemoved: number
  date_removed: null | Date
  keyword: string
  user: number
  owner: number
  group: number
  folders: number[]
}

export interface Details {
  id: number
  websiteTitle: string
  itemType: string
  url: string
  title: string
  subtitle: string
  author: string
  description: string
  journalItBelongs: string
  volume: string
  numOfCitation: string
  numOfDownload: string
  numOfPages: string
  edition: string
  publisher: string
  publicationYear: string
  DOI: string
  ISSN: string
}

export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  department: number
}
