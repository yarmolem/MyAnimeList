import React from 'react'
import { Box, Heading } from 'native-base'
import { useNavigation } from '@react-navigation/core'
import {
  DrawerNavigationProp,
  DrawerScreenProps
} from '@react-navigation/drawer'

import GoBack from '../components/GoBack'
import type { RootDrawerParamList } from '../navigation/RootDrawerParams'

type PreviewScreenProp = DrawerScreenProps<RootDrawerParamList, 'Preview'>
type PreviewNavProp = DrawerNavigationProp<RootDrawerParamList, 'Preview'>

const PreviewScreen = ({ route }: PreviewScreenProp) => {
  const navigation = useNavigation<PreviewNavProp>()

  return (
    <Box p={6}>
      <GoBack onPress={() => navigation.goBack()} />
      <Heading mt={4}>PreviewScreen ID: {route.params.animeID}</Heading>
    </Box>
  )
}

export default PreviewScreen
