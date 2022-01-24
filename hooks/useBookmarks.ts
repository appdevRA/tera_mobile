import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import * as service from '../api/services/bookmarks'
import { Bookmark, Folder, Group, User } from '../types'
import { GROUPS_QUERY_KEY } from './useGroups'

export const BOOKMARK_QUERY_KEY = 'bookmarks'

interface Props {
  params?: service.ListQueryParams
  options?: UseQueryOptions<Bookmark[]>
}

export default function useBookmarks({ options, params }: Props = {}) {
  return useQuery<Bookmark[]>(
    [BOOKMARK_QUERY_KEY, params],
    () => service.list(params),
    options
  )
}

export function useDestroyBookmarkMutation(id: Bookmark['id']) {
  const queryClient = useQueryClient()

  return useMutation(() => service.destroy(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(BOOKMARK_QUERY_KEY)
      queryClient.invalidateQueries(GROUPS_QUERY_KEY)
    },
  })
}

export function useUnarchiveBookmarkMutation(id: Bookmark['id']) {
  const queryClient = useQueryClient()

  return useMutation(() => service.unarchive(id), {
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

export function useAddToGroupBookmarkMutation(
  id: Bookmark['details']['id'],
  user_id: User['id']
) {
  const queryClient = useQueryClient()

  return useMutation(
    (groupId: Group['id']) => service.addToGroup(id, groupId, user_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(BOOKMARK_QUERY_KEY)
        queryClient.invalidateQueries(GROUPS_QUERY_KEY)
      },
    }
  )
}

export function useUpdateDateAccessedBookmarkMutation(id: Bookmark['id']) {
  const queryClient = useQueryClient()

  return useMutation(() => service.updateDateAccessed(id), {
    onSuccess: () => queryClient.invalidateQueries(BOOKMARK_QUERY_KEY),
  })
}
