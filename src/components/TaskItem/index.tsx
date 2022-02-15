import { Feather } from '@expo/vector-icons'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import {
  Box,
  HStack,
  Icon,
  Input,
  Pressable,
  useColorModeValue
} from 'native-base'

import Checkbox from '../Checkbox'
import TaskLabel from './TaskLabel'
import Swipable from '../Swipable'
import useGetColorTheme from '../../hooks/useGetColorTheme'
import { useCallback } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  label: string
  isDone?: boolean
  isEditing?: boolean
  onToggle: () => void
  onRemove?: () => void
  onPressLabel?: () => void
  onFinishEditing?: () => void
  onChangeLabel?: (label: string) => void
}

type InputEvent = NativeSyntheticEvent<TextInputChangeEventData>

const TaskItem = ({
  label,
  isDone,
  isEditing,
  onToggle,
  onRemove,
  onPressLabel,
  onChangeLabel,
  onFinishEditing,
  simultaneousHandlers
}: Props) => {
  const { getColor } = useGetColorTheme()

  const handleChangeLabel = useCallback(
    (text: string) => {
      onChangeLabel && onChangeLabel(text)
    },
    [onChangeLabel]
  )

  const boxStroke = getColor({ light: 'muted.300', dark: 'muted.500' })
  const highlightColor = getColor({ light: 'blue.400', dark: 'blue.500' })
  const checkmarkColor = getColor({ light: 'white', dark: 'white' })
  const activeText = getColor({ light: 'darkText', dark: 'lightText' })
  const doneTextColor = getColor({ light: 'muted.400', dark: 'muted.600' })

  return (
    <Swipable
      onSwipeLeft={onRemove}
      simultaneousHandlers={simultaneousHandlers}
      backView={
        <Box
          pr={4}
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Icon color="white" as={<Feather name="trash-2" />} size="sm" />
        </Box>
      }
    >
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

        {isEditing ? (
          <Input
            px={1}
            py={0}
            fontSize={19}
            value={label}
            variant="unstyled"
            placeholder="Task"
            autoFocus
            blurOnSubmit
            onBlur={onFinishEditing}
            onChangeText={handleChangeLabel}
          />
        ) : (
          <TaskLabel
            textColor={activeText}
            strikeThrough={isDone!}
            onPress={onPressLabel}
            inactiveTextColor={doneTextColor}
          >
            {label}
          </TaskLabel>
        )}
      </HStack>
    </Swipable>
  )
}

export default TaskItem
