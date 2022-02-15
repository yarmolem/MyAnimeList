import React, { useCallback } from 'react'
import {
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  IconButton,
  useColorModeValue
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import MenuButton from './MenuBottom'
import ThemeToggle from './ThemeToggle'
import AnimatedColorBox from './AnimatedColorBox'
import GoBack from './GoBack'

const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props
  const currentRoute = state.routeNames[state.index]

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main')
  }, [navigation])
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('About')
  }, [navigation])

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <GoBack onPress={handlePressBackButton} />
        </HStack>
        <Avatar
          mb={6}
          size="xl"
          borderWidth={3}
          borderRadius={100}
          borderColor="secondary.500"
          source={require('../assets/profile.png')}
        />
        <Heading mb={4} size="xl">
          Yarmo
        </Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon="home"
        >
          Inicio
        </MenuButton>
        <MenuButton
          icon="target"
          onPress={handlePressMenuAbout}
          active={currentRoute === 'About'}
        >
          En emision
        </MenuButton>
        <MenuButton
          icon="eye-off"
          onPress={handlePressMenuAbout}
          active={currentRoute === 'About'}
        >
          Finalizados
        </MenuButton>
        <MenuButton
          icon="eye"
          onPress={handlePressMenuAbout}
          active={currentRoute === 'About'}
        >
          Vistos
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  )
}

export default Sidebar
