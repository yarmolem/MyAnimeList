import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import theme from '../theme'

interface Props {
  children: React.ReactNode
}

const AppContainer = ({ children }: Props) => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </NavigationContainer>
  )
}

export default AppContainer
