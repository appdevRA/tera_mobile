import React from 'react'
import { Button, Divider, Heading, HStack, Spinner, Text } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { FlatList, StyleSheet, View } from 'react-native'
import { Group } from '../types'
import useBookmarks from '../hooks/useBookmarks'
import BookmarkCard from '../components/Bookmark'
import { searchSelector, useSearchStore } from '../stores/searchScreenStore'
import useGroups from '../hooks/useGroups'
import { userSelector, useUserStore } from '../stores/userStore'

export default function PrivateGroupDetailScreen({
  handleOnPressBack,
  groupId,
}: {
  handleOnPressBack: () => void
  groupId?: Group['id']
}) {
  const { data, isLoading } = useBookmarks({
    options: { enabled: Boolean(groupId) },
    params: { group: groupId },
  })
  const user = useUserStore(userSelector)
  const { data: groups } = useGroups({ params: { for_user: user?.id } })
  const groupName = groups?.find(({ id }) => id === groupId)?.name
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
          onPress={handleOnPressBack}
          justifyContent="center"
          alignItems="center"
          w="8"
          h="8"
          padding={0}
        >
          <Entypo name="chevron-left" size={14} color="#374151" />
        </Button>
        <Heading size="md">{groupName}</Heading>
      </HStack>
      <FlatList
        style={styles.flatListContainer}
        data={
          search
            ? data?.filter((bookmark) =>
                bookmark.details.title
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
            : data
        }
        renderItem={({ item }) => (
          <BookmarkCard bookmark={item} currentFolderId={groupId} />
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
