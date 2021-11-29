import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NativeBaseProvider, extendTheme } from 'native-base'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import Colors from './constants/Colors'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()

export default function App() {
  const isLoadingComplete = useCachedResources()
  const theme = extendTheme({
    colors: {
      maroon: { 400: Colors.primary.maroon },
      gold: { 400: Colors.primary.gold },
    },
    components: {
      Input: {
        baseStyle: {
          _focus: {
            borderColor: 'maroon.400',
          },
        },
      },
    },
  })

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <QueryClientProvider client={client}>
        <NativeBaseProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    )
  }
}
