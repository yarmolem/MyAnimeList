import { Box, HStack, Pressable, Text, useColorModeValue } from 'native-base'

import Checkbox from '../Checkbox'
import useGetColorTheme from '../../hooks/useGetColorTheme'
import TaskLabel from './TaskLabel'

interface Props {
  isDone: boolean
  onToggle: () => void
}

const TaskItem = ({ isDone, onToggle }: Props) => {
  const { getColor } = useGetColorTheme()

  const boxStroke = getColor({ light: 'muted.300', dark: 'muted.500' })
  const highlightColor = getColor({ light: 'blue.400', dark: 'blue.500' })
  const checkmarkColor = getColor({ light: 'white', dark: 'white' })
  const activeText = getColor({ light: 'darkText', dark: 'lightText' })
  const doneTextColor = getColor({ light: 'muted.400', dark: 'muted.600' })

  return (
    <HStack
      px={4}
      py={2}
      w="full"
      alignItems="center"
      bg={useColorModeValue('gray.50', 'primary.900')}
    >
      <Box w={30} h={30} mr={2}>
        <Pressable onPress={onToggle}>
          <Checkbox
            checked={isDone}
            boxOutlineColor={boxStroke}
            highlightColor={highlightColor}
            checkmarkColor={checkmarkColor}
          />
        </Pressable>
      </Box>

      <TaskLabel
        strikeThrough={isDone}
        textColor={activeText}
        inactiveTextColor={doneTextColor}
      >
        Task item
      </TaskLabel>
    </HStack>
  )
}

export default TaskItem
