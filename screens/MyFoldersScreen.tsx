import { useIsFocused } from '@react-navigation/core'
import { Spinner } from 'native-base'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import BookmarkGroupCard from '../components/BookmarkGroupCard'
import useFolders from '../hooks/useFolders'
import {
  searchSelector,
  setActiveScreenSelector,
  useSearchStore,
} from '../stores/searchScreenStore'
import { userSelector, useUserStore } from '../stores/userStore'
import { Folder } from '../types'
import FolderDetailScreen from './FoldersDetailScreen'

export default function MyFoldersScreen() {
  const user = useUserStore(userSelector)
  const { data, isLoading } = useFolders({ params: { user: user?.id } })
  const [folderId, setFolderId] = useState<Folder['id'] | undefined>(undefined)
  const isFocused = useIsFocused()
  const setActiveScreen = useSearchStore(setActiveScreenSelector)
  const search = useSearchStore(searchSelector)

  useEffect(() => {
    if (isFocused) setActiveScreen(folderId ? 'folderDetail' : 'foldersList')
  }, [folderId, isFocused])

  if (isLoading)
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    )

  return (
    <View style={styles.container}>
      {folderId ? (
        <FolderDetailScreen
          onPress={() => setFolderId(undefined)}
          folderId={folderId}
        />
      ) : (
        <FlatList
          style={styles.flatListContainer}
          data={
            search
              ? data?.filter((folder) =>
                  folder.name.toLowerCase().includes(search.toLowerCase())
                )
              : data
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setFolderId(item.id)}
              style={{ paddingVertical: 12 }}
            >
              <BookmarkGroupCard name={item.name} />
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
