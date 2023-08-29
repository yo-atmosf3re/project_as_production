import React, { useMemo } from 'react'
import { LOCAL_STORAGE_THEME_KEY, THEME, ThemeContext } from './ThemeContext';

const DEFAULT_THEME = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as THEME || THEME.LIGHT;

const ThemeProvider: React.FC = ({
   children
}) => {

   const [theme, setTheme] = React.useState<THEME>(DEFAULT_THEME);

   const defaultProps = useMemo(() => ({
      theme: theme,
      setTheme: setTheme,
   }), [theme])

   return (
      <ThemeContext.Provider value={defaultProps}>
         {children}
      </ThemeContext.Provider>
   )
}

export default ThemeProvider