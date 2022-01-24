import { useIsFocused } from '@react-navigation/core'
import { Spinner } from 'native-base'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import BookmarkGroupCard from '../components/BookmarkGroupCard'
import useGroups from '../hooks/useGroups'
import {
  searchSelector,
  setActiveScreenSelector,
  useSearchStore,
} from '../stores/searchScreenStore'
import { userSelector, useUserStore } from '../stores/userStore'
import { Group } from '../types'
import PrivateGroupDetailScreen from './PrivateGroupDetailScreen'

export default function PrivateGroupsScreen() {
  const user = useUserStore(userSelector)
  const { data, isLoading } = useGroups({ params: { for_user: user?.id } })

  const [groupId, setGroupId] = useState<Group['id'] | undefined>(undefined)
  const isFocused = useIsFocused()
  const setActiveScreen = useSearchStore(setActiveScreenSelector)
  const search = useSearchStore(searchSelector)

  const handleOnPressBack = () => setGroupId(undefined)

  useEffect(() => {
    if (isFocused) setActiveScreen(groupId ? 'groupDetail' : 'groupsList')
  }, [groupId, isFocused])

  if (isLoading)
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    )

  return (
    <View style={styles.container}>
      {groupId ? (
        <PrivateGroupDetailScreen
          groupId={groupId}
          handleOnPressBack={handleOnPressBack}
        />
      ) : (
        <FlatList
          style={styles.flatListContainer}
          data={
            search
              ? data?.filter((group) =>
                  group.name.toLowerCase().includes(search.toLowerCase())
                )
              : data
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setGroupId(item.id)}
              style={{ paddingVertical: 12 }}
            >
              <BookmarkGroupCard name={item.name} isFolder={false} />
            </Pressable>
          )}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                marginTop: 12,
              }}
            >
              <Text>Empty</Text>
            </View>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  flatListContainer: { width: '100%' },
})
