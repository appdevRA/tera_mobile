import React, { useState } from 'react'
import {
  Heading,
  HStack,
  VStack,
  Text,
  Pressable,
  useDisclose,
  Actionsheet,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { Bookmark, Folder } from '../types'
import Colors from '../constants/Colors'
import {
  useAddToFolderBookmarkMutation,
  useDestroyBookmarkMutation,
  useToggleFavoriteBookmarkMutation,
  useUpdateDateAccessedBookmarkMutation,
} from '../hooks/useBookmarks'
import useFolders from '../hooks/useFolders'
import { Alert, Linking } from 'react-native'

export default function BookmarkCard({
  bookmark,
  currentFolderId,
}: {
  bookmark: Bookmark
  currentFolderId?: Folder['id']
}) {
  const { isOpen, onOpen, onClose } = useDisclose()
  const {
    isOpen: isOpenAddSheet,
    onOpen: onOpenAddSheet,
    onClose: onCloseAddSheet,
  } = useDisclose()
  const { mutateAsync: destroy, isLoading } = useDestroyBookmarkMutation(
    bookmark.id
  )
  const { mutateAsync: toggleFavorite } = useToggleFavoriteBookmarkMutation(
    bookmark.id
  )
  const { mutateAsync: addToFolder } = useAddToFolderBookmarkMutation(
    bookmark.id
  )
  const { mutateAsync: updateDateAccessed } =
    useUpdateDateAccessedBookmarkMutation(bookmark.id)
  const { data: folders, isLoading: isLoadingFolders } = useFolders()
  const [selectedFolders, setSelectedFolders] = useState(() => bookmark.folders)

  const handleCloseAddSheet = async () => {
    onCloseAddSheet()
    // deep equality check
    if (JSON.stringify(bookmark.folders) !== JSON.stringify(selectedFolders))
      await addToFolder(selectedFolders)
  }

  if (isLoading || isLoadingFolders) return null

  return (
    <Pressable
      onPress={() => {
        Alert.alert(
          'Open link?',
          'This will navigate you to the bookmarked url.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'OK',
              onPress: async () => {
                await updateDateAccessed()
                Linking.openURL(bookmark.url)
              },
            },
          ]
        )
      }}
    >
      <HStack space="4" alignItems="center" paddingY="3">
        <VStack flexGrow={1} flexShrink={1}>
          <Text fontSize="xs">{bookmark.websiteTitle}</Text>
          <Heading size="sm" color={Colors.utils.link}>
            {bookmark.title}
          </Heading>
          <Text fontSize="xs" numberOfLines={2}>
            {bookmark.description}
          </Text>
          <Text fontSize="xs">{bookmark.author}</Text>
          <Text color="gray.400" fontSize="xs">
            {bookmark.url}
          </Text>
        </VStack>
        {!bookmark.isRemoved ? (
          <HStack>
            <Pressable hitSlop={20} onPress={onOpen}>
              <Feather
                name="more-horizontal"
                size={16}
                style={{ flexShrink: 0 }}
              />
            </Pressable>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <Actionsheet.Item
                  onPress={async () => {
                    onClose()
                    await toggleFavorite()
                  }}
                >
                  {bookmark.isFavorite ? 'Remove Favorite' : 'Favorite'}
                </Actionsheet.Item>
                <Actionsheet.Item
                  onPress={async () => {
                    await destroy()
                    onClose()
                  }}
                >
                  Delete
                </Actionsheet.Item>
                <Actionsheet.Item
                  onPress={() => {
                    onClose()
                    onOpenAddSheet()
                  }}
                >
                  Add to Folder
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
            <Actionsheet isOpen={isOpenAddSheet} onClose={handleCloseAddSheet}>
              <Actionsheet.Content>
                <Heading size="sm" color="gray.400" mb="4">
                  Choose Folder
                </Heading>
                {folders
                  ?.filter((folder) => folder.id !== currentFolderId) // excluded current folder since select/deselect action is rendundant with removing userbookmark
                  ?.map((folder) => {
                    const selected = selectedFolders.includes(folder.id)
                    const id = folder.id

                    return (
                      <Actionsheet.Item
                        key={folder.name}
                        bgColor={selected ? 'gray.200' : undefined}
                        onPress={() => {
                          selected
                            ? setSelectedFolders((currentFolders) =>
                                currentFolders.filter(
                                  (folderId) => id !== folderId
                                )
                              )
                            : setSelectedFolders((currentFolders) => [
                                ...currentFolders,
                                id,
                              ])
                        }}
                      >
                        {folder.name}
                      </Actionsheet.Item>
                    )
                  })}
              </Actionsheet.Content>
            </Actionsheet>
          </HStack>
        ) : null}
      </HStack>
    </Pressable>
  )
}
