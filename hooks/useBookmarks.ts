import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import * as service from '../api/services/bookmarks'
import { Bookmark, Folder } from '../types'

export const BOOKMARK_QUERY_KEY = 'bookmarks'

interface Props {
  params?: service.Params
  options?: UseQueryOptions<Bookmark[]>
}

export default function useBookmarks({ options, params }: Props = {}) {
  return useQuery<Bookmark[]>(
    [BOOKMARK_QUERY_KEY, params?.folder, params?.filter],
    () => service.list(params),
    options
  )
}

export function useDestroyBookmarkMutation(id: Bookmark['id']) {
  const queryClient = useQueryClient()

  return useMutation(() => service.destroy(id), {
    onSuccess: () => queryClient.invalidateQueries(BOOKMARK_QUERY_KEY),
  })
}

export function useToggleFavoriteBookmarkMutation(id: Bookmark['id']) {
  const queryClient = useQueryClient()

  return useMutation(() => service.toggleFavorite(id), {
    onSuccess: () => queryClient.invalidateQueries(BOOKMARK_QUERY_KEY),
  })
}

export function useAddToFolderBookmarkMutation(id: Bookmark['id']) {
  const queryClient = useQueryClient()

  return useMutation(
    (folderIds: Array<Folder['id']>) => service.addToFolder(id, folderIds),
    { onSuccess: () => queryClient.invalidateQueries(BOOKMARK_QUERY_KEY) }
  )
}

export function useUpdateDateAccessedBookmarkMutation(id: Bookmark['id']) {
  const queryClient = useQueryClient()

  return useMutation(() => service.updateDateAccessed(id), {
    onSuccess: () => queryClient.invalidateQueries(BOOKMARK_QUERY_KEY),
  })
}
