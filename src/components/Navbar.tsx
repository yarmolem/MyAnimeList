import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  Box,
  HStack,
  Heading,
  IconButton,
  useColorModeValue
} from 'native-base'
import type { DrawerHeaderProps } from '@react-navigation/drawer'

const NavBar = ({ navigation }: DrawerHeaderProps) => {
  return (
    <HStack
      p={4}
      h={24}
      w="full"
      alignItems="flex-end"
      alignContent="center"
      _dark={{ bg: 'primary.800' }}
      _light={{ bg: 'gray.50' }}
    >
      <IconButton
        onPress={() => navigation.openDrawer()}
        borderRadius={100}
        _icon={{
          size: 6,
          as: Feather,
          name: 'menu',
          color: useColorModeValue('#323232', '#fff')
        }}
      />

      <Box flex={1}>
        <Heading textAlign="center">My Anime list</Heading>
      </Box>

      <IconButton
        // onPress={handlePressMenuButton}
        borderRadius={100}
        _icon={{
          size: 6,
          as: Feather,
          name: 'user',
          color: useColorModeValue('#323232', '#fff')
        }}
      />
    </HStack>
  )
}

export default NavBar
