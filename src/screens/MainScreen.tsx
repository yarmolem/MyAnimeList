import { useCallback, useState } from 'react'
import { Box, Text, Center, VStack } from 'native-base'

import TaskItem from '../components/TaskItem'
import ThemeToggle from '../components/ThemeToggle'

const MainScreen = () => {
  const [checked, setChecked] = useState(false)

  const handleToggle = useCallback(() => setChecked(v => !v), [])

  return (
    <Center
      px={4}
      flex={1}
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
    >
      <VStack space={5} alignItems="center">
        <Box w="100px" h="100px">
          <TaskItem onToggle={handleToggle} isDone={checked} />
        </Box>
        <Box>
          <Text>Hello</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default MainScreen
