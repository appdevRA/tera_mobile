import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamList = {
  Login: undefined
  Root: NavigatorScreenParams<RootTabParamList> | undefined
}

export type RootTabParamList = {
  'All References': {
    filter?: 'recently added' | 'recently read' | 'favorites' | 'trash'
  }
  'My Collections': undefined
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

export interface Folder {
  id: number
  name: string
  date_created: Date
  user: number
}

export interface Bookmark {
  id: number
  websiteTitle: string
  itemType: string
  url: string
  title: string
  subtitle: string
  author: string
  description: string
  journalItBelongs: string
  volume: number
  numOfCitation: string
  numOfDownload: string
  numOfPages: string
  edition: string
  publisher: string
  publicationYear: string
  dateAccessed: Date
  dateAdded: Date
  DOI: string
  ISSN: string
  isRemoved: number
  isFavorite: boolean
  date_removed: null | Date
  user: number
  folders: Array<Folder['id']>
}
