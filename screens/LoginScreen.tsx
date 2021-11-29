import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  Button,
  FormControl,
  Input,
  KeyboardAvoidingView,
  VStack,
  WarningOutlineIcon,
} from 'native-base'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import Colors from '../constants/Colors'
import { RootStackParamList } from '../types'

export default function LoginScreen() {
  const { push } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameTouched, setUsernameTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const isInvalidUsername = usernameTouched && !username
  const isInvalidPassword = passwordTouched && !password

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ height: '50%', width: '50%' }}
          resizeMode="contain"
          source={require('../assets/images/logo.png')}
        />
      </View>
      <View style={styles.accentBg}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Login</Text>

          <VStack space={3} mt="5">
            <FormControl isInvalid={isInvalidUsername}>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                variant="underlined"
                value={username}
                onChangeText={(val) => setUsername(val)}
                onBlur={() => setUsernameTouched(true)}
                autoCapitalize="none"
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="3" />}
              >
                Enter your username
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={isInvalidPassword}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                variant="underlined"
                type={show ? 'text' : 'password'}
                value={password}
                onChangeText={(val) => setPassword(val)}
                onBlur={() => setPasswordTouched(true)}
                InputRightElement={
                  <Button
                    size="xs"
                    rounded="none"
                    variant="unstyled"
                    onPress={handleClick}
                  >
                    {show ? 'Hide' : 'Show'}
                  </Button>
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="3" />}
              >
                Enter your password
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <Pressable
            style={{
              height: 40,
              position: 'absolute',
              bottom: -20,
              alignSelf: 'center',
              width: '100%',
              borderRadius: 99,
              backgroundColor: Colors.primary.gold,
              zIndex: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setPasswordTouched(true)
              setUsernameTouched(true)
              if (!password || !username) return

              push('Root')
            }}
          >
            <Text style={{ color: Colors.primary.maroon, fontWeight: 'bold' }}>
              LOGIN
            </Text>
          </Pressable>
          <Button
            position="absolute"
            bottom="-60"
            alignSelf="center"
            w="full"
            variant="unstyled"
            _text={{ color: 'white' }}
          >
            Forgot Password?
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.white,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '50%',
    backgroundColor: Colors.primary.white,
    zIndex: -1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentBg: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: Colors.primary.maroon,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    position: 'absolute',
    top: -40,
    backgroundColor: Colors.primary.white,
    elevation: 3,
    width: '80%',
    borderColor: Colors.utils.gray5,
    borderWidth: 1,
    padding: 20,
    paddingBottom: 40,
  },
  formTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})
