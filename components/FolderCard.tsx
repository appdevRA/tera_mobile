import React from 'react'
import { Text } from 'react-native'
import { Row } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

export default function FolderCard({ name }: { name: string }) {
  return (
    <Row width="full" space="sm" alignItems="center">
      <AntDesign name="folderopen" size={24} color="black" />
      <Text
        style={{
          textTransform: 'capitalize',
          fontSize: 16,
        }}
      >
        {name}
      </Text>
    </Row>
  )
}
