import React, { useRef } from 'react'
import { Feather } from '@expo/vector-icons'
import { View, TextInput, Pressable } from 'react-native'
import Colors from '../constants/Colors'
import {
  useSearchStore,
  setSearchSelector,
  searchSelector,
} from '../stores/searchScreenStore'

export default function Search() {
  const ref = useRef<TextInput>()

  const setSearch = useSearchStore(setSearchSelector)
  const search = useSearchStore(searchSelector)

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 99,
        borderColor: Colors.utils.gray3,
        backgroundColor: Colors.primary.white,
        paddingVertical: 6,
        paddingLeft: 8,
        elevation: 2,
      }}
    >
      <Pressable
        style={{ marginRight: 6 }}
        onPress={() => ref.current?.focus()}
        hitSlop={24}
      >
        <Feather name="search" size={14} color={Colors.utils.gray3} />
      </Pressable>
      <TextInput
        style={{ fontSize: 14, height: '100%', width: '92%' }}
        placeholder="Search"
        ref={ref as any}
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        clearButtonMode="always"
      />
    </View>
  )
}
