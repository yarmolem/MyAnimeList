import { HStack, IconButton, useColorModeValue } from 'native-base'
import React from 'react'
import { Feather } from '@expo/vector-icons'

interface Props {
  onPress?: () => void
}

const GoBack = ({ onPress }: Props) => {
  return (
    <HStack>
      <IconButton
        variant="outline"
        borderRadius={100}
        onPress={() => onPress && onPress()}
        borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
        _icon={{
          as: Feather,
          name: 'chevron-left',
          size: 6,
          color: useColorModeValue('blue.800', 'darkBlue.700')
        }}
      />
    </HStack>
  )
}

export default GoBack
