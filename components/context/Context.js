import React, { useContext, createContext } from 'react'

export const AppContext = createContext({});

export const AppContextProvider = ({ children}) => {
    const [ingles, setIngles] = React.useState(false);
    const [espa, setEspa] = React.useState(true);
    
    const onIdiomaIngles = () => {
        setIngles(true);
        setEspa(false);
    }

    const onIdiomaEspa = () => {
        setIngles(false);
        setEspa(true);
    }



    return (
        <AppContext.Provider value={{ ingles, espa, onIdiomaIngles, onIdiomaEspa }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);