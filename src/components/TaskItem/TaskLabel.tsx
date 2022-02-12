import { memo, ReactNode } from 'react'
import { Box, HStack, Pressable, Text } from 'native-base'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor
} from 'react-native-reanimated'

interface Props {
  strikeThrough: boolean
  textColor: string
  inactiveTextColor: string
  children?: ReactNode
  onPress?: () => void
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedText = Animated.createAnimatedComponent(Text)
const AnimatedHStack = Animated.createAnimatedComponent(HStack)

const TaskLabel = ({
  textColor,
  strikeThrough,
  inactiveTextColor,
  children,
  onPress
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <AnimatedHStack alignItems="center">
        <AnimatedText fontSize={19} noOfLines={1} isTruncated px={1}>
          {children}
        </AnimatedText>
        <AnimatedBox position="absolute" h={1} borderBottomWidth={1} />
      </AnimatedHStack>
    </Pressable>
  )
}

export default memo(TaskLabel)
