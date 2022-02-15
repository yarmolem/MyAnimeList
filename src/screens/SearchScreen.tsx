import React from 'react'
import { Box, Heading } from 'native-base'
import { useNavigation } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'

import GoBack from '../components/GoBack'
import type { RootDrawerParamList } from '../navigation/RootDrawerParams'

type SearchScreenProp = DrawerNavigationProp<RootDrawerParamList, 'Search'>

const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenProp>()

  return (
    <Box p={6}>
      <GoBack onPress={() => navigation.goBack()} />
      <Heading mt={4}>SearchScreen</Heading>
    </Box>
  )
}

export default SearchScreen
