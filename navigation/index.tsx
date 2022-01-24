import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Colors from '../constants/Colors'
import { RootStackParamList, RootTabParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import Header from '../components/Header'
import LoginScreen from '../screens/LoginScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Pressable, View } from 'react-native'
import Search from '../components/Search'
import TopTabBar from '../components/TopTabBar'
import MyCollectionsScreen from '../screens/MyCollectionsScreen'
import MyFoldersScreen from '../screens/MyFoldersScreen'
import AccountSettingsScreen from '../screens/AccountSettingsScreen'
import ChangePasswordScreen from '../screens/ChangePasswordScreen'
import { Menu, ThreeDotsIcon } from 'native-base'
import PrivateGroupsScreen from '../screens/PrivateGroupsScreen'

export default function Navigation() {
  return (
    <>
      <NavigationContainer linking={LinkingConfiguration}>
        <RootNavigator />
      </NavigationContainer>
    </>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Root" component={TopTabNavigator} />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={({ navigation }) => ({
          title: 'Profile',
          headerShown: true,
          headerRight: () => (
            <Menu
              w="180"
              offset={8}
              trigger={(triggerProps) => (
                <Pressable
                  style={{ transform: [{ rotate: '90deg' }] }}
                  {...triggerProps}
                >
                  <ThreeDotsIcon size="4" />
                </Pressable>
              )}
            >
              <Menu.Item onPress={() => navigation.navigate('ChangePassword')}>
                Change Password
              </Menu.Item>
            </Menu>
          ),
        })}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: true, title: 'Change Password' }}
      />
    </Stack.Navigator>
  )
}

const Tab = createMaterialTopTabNavigator<RootTabParamList>()

export function TopTabNavigator() {
  return (
    <>
      <Header />
      <View
        style={{
          padding: 16,
          paddingTop: 0,
          backgroundColor: Colors.primary.white,
        }}
      >
        <Search />
      </View>
      <Tab.Navigator
        initialRouteName="My Collections"
        tabBar={(props) => <TopTabBar {...props} />}
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: Colors.primary.maroon },
          tabBarStyle: { flexGrow: 1, elevation: 0 },
          tabBarLabelStyle: { textTransform: 'none', fontSize: 12 },
        }}
        sceneContainerStyle={{ backgroundColor: Colors.primary.white }}
      >
        <Tab.Screen name="My Collections" component={MyCollectionsScreen} />
        <Tab.Screen name="My Folders" component={MyFoldersScreen} />
        <Tab.Screen name="Private Groups" component={PrivateGroupsScreen} />
      </Tab.Navigator>
    </>
  )
}
