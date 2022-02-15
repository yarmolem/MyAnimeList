import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Flex, Heading, Icon, Pressable } from 'native-base'

interface Props {
  label?: string
  isFirst?: boolean
  onPress?: () => void
}

const NavCard = ({ label, isFirst, onPress }: Props) => {
  return (
    <Pressable onPress={() => onPress && onPress()}>
      <Flex
        w="165px"
        h="40"
        rounded="lg"
        p={4}
        mr={4}
        ml={isFirst ? 4 : 0}
        _dark={{ bg: 'primary.700' }}
        _light={{ bg: 'primary.100' }}
      >
        <Heading size="lg">{label}</Heading>
        <Icon
          as={Feather}
          name="chevron-right"
          size={10}
          mt="auto"
          alignSelf="flex-end"
        />
      </Flex>
    </Pressable>
  )
}

export default NavCard
