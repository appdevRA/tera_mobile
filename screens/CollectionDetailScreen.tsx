import React from 'react'
import { Button, Divider, Heading, HStack, Spinner, Text } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { FlatList, StyleSheet, View } from 'react-native'
import { Folder } from '../types'
import useBookmarks from '../hooks/useBookmarks'
import BookmarkCard from '../components/Bookmark'
import useFolders from '../hooks/useFolders'
import { searchSelector, useSearchStore } from '../stores/searchScreenStore'

export default function CollectionDetailScreen({
  onPress,
  folderId,
}: {
  onPress: () => void
  folderId?: Folder['id']
}) {
  const { data, isLoading } = useBookmarks({
    options: { enabled: Boolean(folderId) },
    params: { folder: folderId },
  })
  const { data: folders } = useFolders()
  const folderName = folders?.find(({ id }) => id === folderId)?.name
  const search = useSearchStore(searchSelector)

  if (isLoading)
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    )

  return (
    <View style={styles.container}>
      <HStack alignItems="center" mb="2">
        <Button
          colorScheme="coolGray"
          variant="unstyled"
          onPress={onPress}
          justifyContent="center"
          alignItems="center"
          w="8"
          h="8"
          padding={0}
        >
          <Entypo name="chevron-left" size={14} color="#374151" />
        </Button>
        <Heading size="md">{folderName}</Heading>
      </HStack>
      <FlatList
        style={styles.flatListContainer}
        data={
          search
            ? data?.filter((bookmark) =>
                bookmark.title.toLowerCase().includes(search.toLowerCase())
              )
            : data
        }
        renderItem={({ item }) => (
          <BookmarkCard bookmark={item} currentFolderId={folderId} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Divider thickness={2} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Text>Empty</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  flatListContainer: { width: '100%' },
})
