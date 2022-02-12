import { Text, HStack, Switch, useColorMode } from 'native-base'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch value={colorMode === 'light'} onToggle={toggleColorMode} />
      <Text>Light</Text>
    </HStack>
  )
}

export default ThemeToggle
