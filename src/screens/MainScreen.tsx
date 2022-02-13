import { useCallback, useState } from 'react'
import { Box, Center, VStack } from 'native-base'

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
      <VStack space={5} alignItems="center" w="full">
        <Box w="full" h="100px">
          <TaskItem onToggle={handleToggle} isDone={checked} />
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default MainScreen
