import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'DEFAULT' | 'DIWALI' | 'ONAM' | 'NEW_YEAR';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeType>('DEFAULT');

    const setTheme = (newTheme: ThemeType) => {
        setThemeState(newTheme);
        localStorage.setItem('federal-bank-theme', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('federal-bank-theme') as ThemeType;
        if (savedTheme) {
            setThemeState(savedTheme);
        }
    }, []);

    // Apply theme class to body for global CSS variable switching
    useEffect(() => {
        const body = document.body;
        body.classList.remove('theme-default', 'theme-diwali', 'theme-onam', 'theme-newyear');

        switch (theme) {
            case 'DIWALI':
                body.classList.add('theme-diwali');
                break;
            case 'ONAM':
                body.classList.add('theme-onam');
                break;
            case 'NEW_YEAR':
                body.classList.add('theme-newyear');
                break;
            default:
                body.classList.add('theme-default');
                break;
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
