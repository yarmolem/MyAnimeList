import React from 'react'
import { Dimensions } from 'react-native'
import { Box, Text } from 'native-base'
import {
  PanGestureHandler,
  PanGestureHandlerProps,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler
} from 'react-native-reanimated'
import { makeStyledComponent } from '../utils/makeStyledComponent'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  children: React.ReactNode
  backView?: React.ReactNode
  onSwipeLeft?: () => void
}

const StyledView = makeStyledComponent(Animated.View)

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2

const Swipable = ({
  children,
  backView,
  onSwipeLeft,
  simultaneousHandlers
}: Props) => {
  const translateX = useSharedValue(0)
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: e => {
      translateX.value = Math.max(-128, Math.min(0, e.translationX))
    },
    onEnd: e => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        onSwipeLeft && runOnJS(onSwipeLeft)()
      } else {
        translateX.value = withTiming(0)
      }
    }
  })

  const fadeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  return (
    <StyledView>
      {backView && (
        <Box position="absolute" left={0} right={0} bottom={0} top={0}>
          {backView}
        </Box>
      )}
      <PanGestureHandler
        onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandlers}
      >
        <StyledView style={fadeStyle}>{children}</StyledView>
      </PanGestureHandler>
    </StyledView>
  )
}

export default Swipable
