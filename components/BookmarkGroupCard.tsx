import React from 'react'
import { Text } from 'react-native'
import { Row } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

export default function BookmarkGroupCard({
  name,
  isFolder = true,
}: {
  name: string
  isFolder?: boolean
}) {
  return (
    <Row width="full" space="sm" alignItems="center">
      <AntDesign name={isFolder ? 'folder1' : 'user'} size={24} color="black" />
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
