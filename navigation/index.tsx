import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Colors from '../constants/Colors'
import { RootStackParamList, RootTabParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import Header from '../components/Header'
import LoginScreen from '../screens/LoginScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Text, View } from 'react-native'
import Search from '../components/Search'
import TopTabBar from '../components/TopTabBar'
import AllReferencesScreen from '../screens/AllReferencesScreen'
import CollectionsScreen from '../screens/CollectionsScreen'

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
        <Tab.Screen name="All References" component={AllReferencesScreen} />
        <Tab.Screen name="My Collections" component={CollectionsScreen} />
        <Tab.Screen name="Private Groups">
          {() => (
            <View>
              <Text>Private Groups</Text>
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  )
}
