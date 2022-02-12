import { useEffect, memo, useMemo } from 'react'
import Svg, { Path } from 'react-native-svg'
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedProps,
  interpolateColor
} from 'react-native-reanimated'

import AnimatedStroke from './AnimatedStroke'

interface Props {
  checked?: boolean
  highlightColor?: string
  checkmarkColor?: string
  boxOutlineColor?: string
}

const MARGIN = 10
const vWidth = 64 + MARGIN
const vHeight = 64 + MARGIN
const boxPath =
  'M24 0.5H40C48.5809 0.5 54.4147 2.18067 58.117 5.18299C61.8193 9.58532 63.5 15.4191 63.5 24V40C63.5 48.5809 61.8193 54.4147 58.117 58.117C54.4147 61.8193 48.5809 63.5 40 63.5H24C15.4191 63.5 9.58532 61.8193 5.88299 58.117C2.18067 54.4147 0.5 48.5809 0.5 40V24C0.5 15.4191 2.19067 9.58532 5.88299 5.88299C9.58532 2.18067 15.4191 0.5 24 0.5Z'
const checkmarkPath = 'M8 32.5C18 39 26 47 26 47C26 47 33 28 63.5 4'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const Checkbox = ({
  checked,
  checkmarkColor = '#000000',
  highlightColor = '#ff0000',
  boxOutlineColor = '#000000'
}: Props) => {
  const progress = useSharedValue(0)

  const { _checkmarkColor, _highlightColor, _boxOutlineColor } = useMemo(
    () => ({
      _checkmarkColor: checkmarkColor,
      _highlightColor: highlightColor,
      _boxOutlineColor: boxOutlineColor
    }),
    [checkmarkColor, highlightColor, boxOutlineColor]
  )

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear
    })
  }, [checked])

  const animatedProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        Easing.bezier(0.16, 1, 0.3, 1).factory()(progress.value),
        [0, 1],
        [_boxOutlineColor, _highlightColor],
        'RGB'
      ),
      fill: interpolateColor(
        Easing.bezier(0.16, 1, 0.3, 1).factory()(progress.value),
        [0, 1],
        ['#00000000', _highlightColor],
        'RGB'
      )
    }),
    [_highlightColor, _boxOutlineColor]
  )

  return (
    <Svg
      viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}
    >
      <AnimatedPath
        d={boxPath}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        animatedProps={animatedProps}
      />
      <AnimatedStroke
        progress={progress}
        d={checkmarkPath}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={_checkmarkColor}
        strokeOpacity={checked || false ? 1 : 0}
      />
    </Svg>
  )
}

export default memo(Checkbox)
