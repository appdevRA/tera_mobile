import { useQuery, UseQueryOptions } from 'react-query'
import * as service from '../api/services/folders'
import { Folder } from '../types'

export const FOLDERS_QUERY_KEY = 'folders'

interface Props {
  params?: service.ListQueryParams
  options?: UseQueryOptions<Folder[]>
}

export default function useFolders({ options, params }: Props = {}) {
  return useQuery<Folder[]>(
    [FOLDERS_QUERY_KEY, params],
    () => service.list(params),
    options
  )
}
