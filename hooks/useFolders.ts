import { useQuery, UseQueryOptions } from 'react-query'
import { list } from '../api/services/folders'
import { Folder } from '../types'

export const FOLDERS_QUERY_KEY = 'folders'

interface Props {
  options?: UseQueryOptions<Folder[]>
}

export default function useFolders({ options }: Props = {}) {
  return useQuery<Folder[]>(FOLDERS_QUERY_KEY, list, options)
}
