import { useCallback } from "react"
import { useTheme, themeTools, useColorModeValue } from "native-base"

interface GetColorProps {
  dark: string
  light: string
}

const useGetColorTheme = () => {
  const theme = useTheme()

  const getColor = useCallback(({ dark, light }: GetColorProps) => {
    return themeTools.getColor(theme, useColorModeValue(light, dark))
  }, []);
  
  return { getColor }
}

export default useGetColorTheme