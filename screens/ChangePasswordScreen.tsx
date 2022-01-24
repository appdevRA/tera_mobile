import React, { useState } from 'react'
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
import { StyleSheet, Text, Alert, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import { RootStackParamList } from '../types'
import { changePassword } from '../api/services/users'
import { userSelector, useUserStore } from '../stores/userStore'

export default function ChangePasswordScreen() {
  const { pop } = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const user = useUserStore(userSelector)

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')

  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const isInvalidConfirmPassword = confirmPasswordTouched && !confirmPassword
  const isInvalidPassword = passwordTouched && !password

  const resetForm = () => {
    setConfirmPassword('')
    setPassword('')
    setPasswordTouched(false)
    setConfirmPasswordTouched(false)
  }

  const handleSubmit = async () => {
    setPasswordTouched(true)
    setConfirmPasswordTouched(true)
    if (!password || !confirmPassword) return

    if (password !== confirmPassword) {
      Alert.alert('', 'Passwords are different. Please try again.', [
        { text: 'OK', style: 'cancel' },
      ])

      resetForm()
    } else {
      await changePassword(user?.id as number, {
        password,
        confirmPassword,
      })
      Alert.alert('', 'Password successfully changed.', [
        {
          text: 'OK',
          onPress: () => {
            resetForm()
            pop()
          },
        },
      ])
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <VStack space={6} mt="5" w="full" px="10">
        <FormControl isInvalid={isInvalidConfirmPassword}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            value={confirmPassword}
            onChangeText={(val) => setConfirmPassword(val)}
            onBlur={() => setConfirmPasswordTouched(true)}
            autoCapitalize="none"
            variant="underlined"
            type={show ? 'text' : 'password'}
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="3" />}>
            This field is required.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={isInvalidPassword}>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input
            variant="underlined"
            type={show ? 'text' : 'password'}
            value={password}
            onChangeText={(val) => setPassword(val)}
            onBlur={() => setPasswordTouched(true)}
            autoCapitalize="none"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="3" />}>
            This field is required.
          </FormControl.ErrorMessage>
        </FormControl>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{ alignItems: 'center', marginTop: 8 }}
        >
          <Text style={{ color: Colors.primary.maroon, fontWeight: 'bold' }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </VStack>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
  },
})
