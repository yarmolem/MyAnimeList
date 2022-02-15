import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Button, Icon, IButtonProps } from 'native-base'
import type { IconFeather } from '../interfaces/icons'

interface Props extends IButtonProps {
  active: boolean
  icon: IconFeather
  children: React.ReactNode
}

const MenuButton = ({ active, icon, children, ...props }: Props) => {
  return (
    <Button
      size="lg"
      _light={{
        colorScheme: 'blue',
        _pressed: {
          bg: 'primary.100'
        },
        _text: {
          color: active ? 'blue.50' : 'blue.500'
        }
      }}
      _dark={{
        colorScheme: 'darkBlue',
        _pressed: {
          bg: 'primary.600'
        },
        _text: {
          color: active ? 'blue.50' : undefined
        }
      }}
      bg={active ? undefined : 'transparent'}
      variant="solid"
      justifyContent="flex-start"
      leftIcon={<Icon as={Feather} name={icon} size="sm" opacity={0.5} />}
      {...props}
    >
      {/* <Feather name="" /> */}
      {children}
    </Button>
  )
}

export default MenuButton
