import React from 'react'
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs'
import { View } from 'react-native'
import { HamburgerIcon, Menu, Pressable } from 'native-base'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { RootTabParamList } from '../types'
import Colors from '../constants/Colors'
import {
  setActiveScreenSelector,
  useSearchStore,
} from '../stores/searchScreenStore'

export default function TopTabBar(props: MaterialTopTabBarProps) {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>()
  const setActiveScreen = useSearchStore(setActiveScreenSelector)

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary.white,
      }}
    >
      <MaterialTopTabBar {...props} />
      <Menu
        w="190"
        flexShrink="0"
        trigger={(triggerProps) => (
          <Pressable
            accessibilityLabel="More options menu"
            size="8"
            alignItems="center"
            justifyContent="center"
            {...triggerProps}
          >
            <HamburgerIcon size="4" />
          </Pressable>
        )}
      >
        <Menu.Item
          onPress={() => {
            navigation.navigate('My Collections', { filter: undefined })
            setActiveScreen('allReferences')
          }}
        >
          All
        </Menu.Item>
        <Menu.Item
          onPress={() => {
            navigation.navigate('My Collections', { filter: 'recently added' })

            setActiveScreen('recentlyAdded')
          }}
        >
          Recently Added
        </Menu.Item>
        <Menu.Item
          onPress={() => {
            navigation.navigate('My Collections', { filter: 'recently read' })
            setActiveScreen('recentlyRead')
          }}
        >
          Recently Read
        </Menu.Item>
        <Menu.Item
          onPress={() => {
            navigation.navigate('My Collections', { filter: 'favorites' })
            setActiveScreen('favorites')
          }}
        >
          Favorites
        </Menu.Item>
        <Menu.Item
          onPress={() => {
            navigation.navigate('My Collections', { filter: 'trash' })
            setActiveScreen('trash')
          }}
        >
          Trash
        </Menu.Item>
      </Menu>
    </View>
  )
}
