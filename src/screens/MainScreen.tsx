import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import {
  Box,
  Flex,
  Icon,
  Image,
  Heading,
  Pressable,
  ScrollView
} from 'native-base'

import NavCard from '../components/NavCard'
import { RootDrawerParamList } from '../navigation/RootDrawerParams'

type MainScreenProp = DrawerNavigationProp<RootDrawerParamList, 'Main'>

const MainScreen = () => {
  const navigation = useNavigation<MainScreenProp>()

  return (
    <Box
      pt={10}
      flex={1}
      _dark={{ bg: 'blueGray.800' }}
      _light={{ bg: 'blueGray.50' }}
    >
      <ScrollView>
        <Box px={6} mb={4}>
          <Heading size="xl">Bienvienid@,</Heading>
          <Heading size="xl" mb={4}>
            Yarmo
          </Heading>
          <Heading size="md" fontWeight="light">
            ¿Que deseas hacer?
          </Heading>
        </Box>

        <ScrollView horizontal mb={4}>
          <NavCard
            isFirst
            label="Buscar anime"
            onPress={() => navigation.navigate('Search')}
          />
          <NavCard label="Tendencias" />
          <NavCard label="Finalizados" />
          <NavCard label="Noticias" />
        </ScrollView>

        <Box px={6} mb={4}>
          <Heading size="md" fontWeight="light" mb={4}>
            Recomendaciones
          </Heading>

          {Array(10)
            .fill(null)
            .map((_, i) => (
              <Pressable
                key={`anime_card_${i}`}
                onPress={() => navigation.navigate('Preview', { animeID: '1' })}
              >
                <Flex flexDirection="row" mb={4} alignItems="center">
                  <Image
                    w="20"
                    h="20"
                    mr={4}
                    alt="Kimetsu no yaiba"
                    rounded="sm"
                    source={require('../assets/kimetsu_preview.jpg')}
                  />
                  <Box justifyContent="space-around">
                    <Heading>Kimetsu no yaiba</Heading>
                    <Heading size="sm" fontWeight="light">
                      Accion, Aventura, Drama ...
                    </Heading>
                    <Heading size="sm" fontWeight="light">
                      2 temporadas
                    </Heading>
                  </Box>
                  <Icon ml={4} as={Feather} name="chevron-right" />
                </Flex>
              </Pressable>
            ))}
        </Box>
      </ScrollView>
    </Box>
  )
}

export default MainScreen
