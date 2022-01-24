import { useQuery, UseQueryOptions } from 'react-query'
import * as service from '../api/services/groups'
import { Group } from '../types'

export const GROUPS_QUERY_KEY = 'groups'

interface Props {
  options?: UseQueryOptions<Group[]>
  params?: service.ListQueryParams
}

export default function useGroups({ options, params }: Props = {}) {
  return useQuery<Group[]>(
    [GROUPS_QUERY_KEY, params],
    () => service.list(params),
    options
  )
}
