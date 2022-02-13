import { memo, ReactNode, useEffect } from 'react'
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
import { ColorValue } from 'react-native'

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
  children,
  textColor,
  strikeThrough,
  inactiveTextColor,
  onPress
}: Props) => {
  const hStackOffset = useSharedValue(0)
  const hStackAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hStackOffset.value }]
    }),
    [strikeThrough]
  )

  const textColorProgress = useSharedValue(0)
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      ) as ColorValue
    }),
    [strikeThrough, textColor, inactiveTextColor]
  )

  const strikeThroughtWidth = useSharedValue(0)
  const strikeThroughtAnimatedStyles = useAnimatedStyle(
    () => ({
      width: `${strikeThroughtWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      ) as ColorValue
    }),
    [strikeThrough, textColor, inactiveTextColor]
  )

  useEffect(() => {
    const easing = Easing.out(Easing.quad)
    if (strikeThrough) {
      hStackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      )

      textColorProgress.value = withDelay(
        400,
        withTiming(1, { duration: 400, easing })
      )

      strikeThroughtWidth.value = withTiming(1, { duration: 400, easing })
    } else {
      textColorProgress.value = withTiming(0, { duration: 400, easing })
      strikeThroughtWidth.value = withTiming(0, { duration: 400, easing })
    }
  }, [strikeThrough])

  return (
    <Pressable onPress={onPress}>
      <AnimatedHStack alignItems="center" style={[hStackAnimatedStyles]}>
        <AnimatedText
          px={1}
          fontSize={19}
          noOfLines={1}
          style={[textColorAnimatedStyles]}
        >
          {children}
        </AnimatedText>
        <AnimatedBox
          h={1}
          position="absolute"
          borderBottomWidth={1}
          style={[strikeThroughtAnimatedStyles]}
        />
      </AnimatedHStack>
    </Pressable>
  )
}

export default memo(TaskLabel)
