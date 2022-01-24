import React, { useState } from 'react'
import {
  Heading,
  HStack,
  VStack,
  Text,
  Pressable,
  useDisclose,
  Actionsheet,
  Tooltip,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { Bookmark, Folder } from '../types'
import Colors from '../constants/Colors'
import {
  useAddToFolderBookmarkMutation,
  useAddToGroupBookmarkMutation,
  useDestroyBookmarkMutation,
  useToggleFavoriteBookmarkMutation,
  useUnarchiveBookmarkMutation,
  useUpdateDateAccessedBookmarkMutation,
} from '../hooks/useBookmarks'
import useFolders from '../hooks/useFolders'
import { Alert, Linking } from 'react-native'
import { userSelector, useUserStore } from '../stores/userStore'
import useGroups from '../hooks/useGroups'
import {
  activeScreenSelector,
  useSearchStore,
} from '../stores/searchScreenStore'

export default function BookmarkCard({
  bookmark,
  currentFolderId,
}: {
  bookmark: Bookmark
  currentFolderId?: Folder['id']
}) {
  const { isOpen, onOpen, onClose } = useDisclose()
  const {
    isOpen: isOpenAddToFolderSheet,
    onOpen: onOpenAddToFolderSheet,
    onClose: onCloseAddToFolderSheet,
  } = useDisclose()
  const {
    isOpen: isOpenAddToGroupSheet,
    onOpen: onOpenAddToGroupSheet,
    onClose: onCloseAddToGroupSheet,
  } = useDisclose()

  const { mutateAsync: destroy, isLoading } = useDestroyBookmarkMutation(
    bookmark.id
  )
  const { mutateAsync: unarchive } = useUnarchiveBookmarkMutation(bookmark.id)
  const { mutateAsync: toggleFavorite } = useToggleFavoriteBookmarkMutation(
    bookmark.id
  )
  const { mutateAsync: addToFolder } = useAddToFolderBookmarkMutation(
    bookmark.id
  )
  const { mutateAsync: updateDateAccessed } =
    useUpdateDateAccessedBookmarkMutation(bookmark.id)
  const user = useUserStore(userSelector)
  const { data: folders, isLoading: isLoadingFolders } = useFolders({
    params: { user: user?.id },
  })
  const [selectedFolders, setSelectedFolders] = useState(() => bookmark.folders)

  const handleCloseAddToFolderSheet = async () => {
    onCloseAddToFolderSheet()
    // deep equality check
    if (JSON.stringify(bookmark.folders) !== JSON.stringify(selectedFolders))
      await addToFolder(selectedFolders)
  }

  const { data: groups, isLoading: isLoadingGroups } = useGroups({
    params: { for_user: user?.id },
  })
  const { data: availableGroups, isLoading: isLoadingAvailableGroups } =
    useGroups({
      params: {
        available_for_bookmark_detail: bookmark.details.id,
      },
    })

  const availableGroupsIds = availableGroups?.map((group) => group.id)

  const { mutateAsync: addToGroup } = useAddToGroupBookmarkMutation(
    bookmark.details.id,
    user?.id as number
  )

  const handleCloseAddToGroupSheet = onCloseAddToGroupSheet

  const activeScreen = useSearchStore(activeScreenSelector)

  if (
    isLoading ||
    isLoadingFolders ||
    isLoadingGroups ||
    isLoadingAvailableGroups
  )
    return null

  return (
    <Pressable
      onLongPress={onOpen}
      onPress={() => {
        if (!bookmark.isRemoved)
          Alert.alert(
            'Open link?',
            'This will navigate you to the bookmarked url.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'OK',
                onPress: async () => {
                  await updateDateAccessed()
                  Linking.openURL(bookmark.details.url)
                },
              },
            ]
          )
      }}
    >
      <HStack space="4" alignItems="center" paddingY="3">
        <VStack flexGrow={1} flexShrink={1}>
          <Text fontSize="xs">{bookmark.details.websiteTitle}</Text>
          <Heading size="sm" color={Colors.utils.link}>
            {bookmark.details.title}
          </Heading>
          <Text fontSize="xs" numberOfLines={2}>
            {bookmark.details.description}
          </Text>
          <Text fontSize="xs">{bookmark.details.author}</Text>
        </VStack>
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
              {!bookmark.isRemoved ? (
                <>
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
                  {activeScreen !== 'groupDetail' ? (
                    <Actionsheet.Item
                      onPress={() => {
                        onClose()
                        onOpenAddToFolderSheet()
                      }}
                    >
                      Add to Folder
                    </Actionsheet.Item>
                  ) : null}
                  <Actionsheet.Item
                    onPress={() => {
                      onClose()
                      onOpenAddToGroupSheet()
                    }}
                  >
                    Add to Group
                  </Actionsheet.Item>
                </>
              ) : (
                <Actionsheet.Item
                  onPress={async () => {
                    await unarchive()
                    onClose()
                  }}
                >
                  Unarchive
                </Actionsheet.Item>
              )}
            </Actionsheet.Content>
          </Actionsheet>

          {!bookmark.isRemoved && activeScreen !== 'groupDetail' ? (
            <Actionsheet
              isOpen={isOpenAddToFolderSheet}
              onClose={handleCloseAddToFolderSheet}
            >
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
          ) : null}

          {!bookmark.isRemoved ? (
            <Actionsheet
              isOpen={isOpenAddToGroupSheet}
              onClose={handleCloseAddToGroupSheet}
            >
              <Actionsheet.Content>
                <Heading size="sm" color="gray.400" mb="4">
                  Choose Group
                </Heading>

                {groups?.map((group) =>
                  availableGroupsIds?.includes(group.id) ? (
                    <Actionsheet.Item
                      key={group.id}
                      onPress={async () => {
                        await addToGroup(group.id)
                        handleCloseAddToGroupSheet()
                      }}
                    >
                      {group.name}
                    </Actionsheet.Item>
                  ) : (
                    <Actionsheet.Item
                      key={group.id}
                      bgColor="gray.200"
                      onPress={() =>
                        Alert.alert(
                          '',
                          'This bookmark is already on this group.'
                        )
                      }
                    >
                      {group.name}
                    </Actionsheet.Item>
                  )
                )}
              </Actionsheet.Content>
            </Actionsheet>
          ) : null}
        </HStack>
      </HStack>
    </Pressable>
  )
}
