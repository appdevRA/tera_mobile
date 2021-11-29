import React from 'react'
import { SvgUri } from 'react-native-svg'
import { View, Image, Pressable } from 'react-native'
import Colors from '../constants/Colors'
import { Menu } from 'native-base'
import { useNavigation } from '@react-navigation/core'
import { RootStackParamList } from '../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const seed = Math.random()

export default function Header() {
  const { replace } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View
      style={{
        backgroundColor: Colors.primary.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 44,
        padding: 16,
      }}
    >
      <Image
        style={{ height: 50, width: 70 }}
        resizeMode="contain"
        source={require('../assets/images/logo.png')}
      />
      <Menu
        w="180"
        offset={8}
        trigger={(triggerProps) => (
          <Pressable
            style={{
              backgroundColor: Colors.primary.white,
              borderRadius: 99,
              borderColor: Colors.primary.maroon,
              borderWidth: 1,
            }}
            {...triggerProps}
          >
            <SvgUri
              width={32}
              height={32}
              uri={`https://avatars.dicebear.com/api/avataaars/${seed}.svg?r=50`}
            />
          </Pressable>
        )}
      >
        <Menu.Item>Account Settings</Menu.Item>
        <Menu.Item onPress={() => replace('Login')}>Logout</Menu.Item>
      </Menu>
    </View>
  )
}
