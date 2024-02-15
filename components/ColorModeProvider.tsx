import { ColorMode, IconsProvider, ThemeProvider } from '@aws-amplify/ui-react';
import * as React from 'react'
import { theme } from '@/theme';
import { LuMoreVertical } from 'react-icons/lu';

interface ColorModeProviderValue {
  colorMode?: ColorMode;
  setColorMode?: React.Dispatch<React.SetStateAction<ColorMode>>
}

export const ColorModeContext = React.createContext<ColorModeProviderValue>({});

export const ColorModeProvider = ({ children }: React.PropsWithChildren) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>('light');

  const handleColorModeChange = (event: any) => {
    const newColorScheme = event.matches ? "dark" : "light";
    setColorMode(newColorScheme);
  }

  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setColorMode('dark');
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleColorModeChange);

    () => { window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleColorModeChange)}
  },[]);

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      <IconsProvider icons={{
        menu: {
          menu: <LuMoreVertical />
        }
      }}>
      <ThemeProvider theme={theme} colorMode={colorMode}>
        {children}
      </ThemeProvider>
      </IconsProvider>
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  return React.useContext(ColorModeContext);
}
