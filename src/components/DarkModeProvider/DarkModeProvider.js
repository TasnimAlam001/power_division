// import React, { createContext } from 'react'

// const ChangeModeContext = createContext();
// export default function DarkModeProvider({children}) {
//     const 

//   return (
//     <ChangeModeContext.Provider >
//         {children}
//     </ChangeModeContext.Provider>
    
//   )
// }
import React, { createContext, useContext, useEffect, useState } from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import webTheme from '@/app/theme';



  
// Create a context for managing dark mode
const DarkModeContext = createContext();

// Custom hook to consume the dark mode context
export const useDarkMode = () => useContext(DarkModeContext);

// Dark mode provider component
export const DarkModeProvider = ({ children }) => {
    const theme = useTheme();
    
    const myTheme = webTheme;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    localStorage.setItem('darkMode', !isDarkMode);
    theme.palette.mode = isDarkMode ? 'dark': 'light';
    console.log(theme)

  };

//   let setThemeMode = (modeValue) => {
    
//   }

  // Function to toggle dark mode

  useEffect(()=>{
    const localStorageMode = localStorage.getItem('darkMode');
    if(localStorageMode){

        setIsDarkMode(localStorageMode);

    }

    





  },[])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, myTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
