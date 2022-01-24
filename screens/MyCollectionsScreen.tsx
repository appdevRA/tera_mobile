import React, { useEffect } from 'react'
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/core'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { RootTabParamList } from '../types'
import { Divider, Flex, Heading, Spinner, VStack } from 'native-base'
import useBookmarks from '../hooks/useBookmarks'
import BookmarkCard from '../components/Bookmark'
import {
  searchSelector,
  setActiveScreenSelector,
  useSearchStore,
} from '../stores/searchScreenStore'
import { userSelector, useUserStore } from '../stores/userStore'

const HeadingTextMap = {
  'recently added': 'Recently Added',
  'recently read': 'Recently Read',
  favorites: 'Favorites',
  trash: 'Trash',
}
const ActiveScreenMap = {
  'recently added': 'recentlyAdded',
  'recently read': 'recentlyRead',
  favorites: 'favorites',
  trash: 'trash',
} as const

export default function MyCollectionsScreen() {
  const user = useUserStore(userSelector)
  const isFocused = useIsFocused()
  const { params } = useRoute<RouteProp<RootTabParamList>>()
  const { data, isLoading } = useBookmarks({
    params: { filter: params?.filter, user: user?.id, groups_only: false },
  })
  const setActiveScreen = useSearchStore(setActiveScreenSelector)
  const search = useSearchStore(searchSelector)

  useEffect(() => {
    if (isFocused)
      setActiveScreen(
        params?.filter ? ActiveScreenMap[params.filter] : 'allReferences'
      )
  }, [isFocused, params?.filter])

  return (
    <VStack style={styles.container}>
      <Heading size="md" alignSelf="flex-start">
        {params?.filter ? HeadingTextMap[params.filter] : 'All References'}
      </Heading>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="full">
          <Spinner />
        </Flex>
      ) : (
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
          renderItem={({ item }) => <BookmarkCard bookmark={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Divider thickness={2} />}
          showsVerticalScrollIndicator={false}
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
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  flatListContainer: { width: '100%', height: '100%' },
})
