import React from 'react'
import { View, VStack } from 'native-base'
import { StyleSheet, Text } from 'react-native'
import Colors from '../constants/Colors'
import { userSelector, useUserStore } from '../stores/userStore'
import { SvgUri } from 'react-native-svg'

export default function AccountSettingsScreen() {
  const user = useUserStore(userSelector)

  if (!user) return null

  return (
    <VStack space={4} style={styles.container}>
      <View
        style={{
          borderColor: Colors.primary.maroon,
          borderWidth: 2,
          borderRadius: 99,
        }}
      >
        <SvgUri
          width={80}
          height={80}
          uri={`https://avatars.dicebear.com/api/avataaars/${user.id}.svg?r=50`}
        />
      </View>

      <VStack space={6} pt="5" alignItems="center">
        <FieldSet label="Name" value={`${user.first_name} ${user.last_name}`} />
        <FieldSet label="Username" value={user.username} />
        <FieldSet label="Email" value={user.email} />
      </VStack>
    </VStack>
  )
}

function FieldSet({ label, value }: { label: string; value: string }) {
  return (
    <VStack alignItems="center">
      <Text style={{ marginBottom: 4, fontSize: 14 }}>{label}</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{value}</Text>
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: Colors.primary.white,
  },
})
