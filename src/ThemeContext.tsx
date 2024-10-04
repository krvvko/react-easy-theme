import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    currentTheme: string;
    changeTheme: (newTheme: string) => void;
    getThemes: () => string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyThemeToHtml = (theme: string): void => {
    document.documentElement.className = '';
    document.documentElement.classList.add(theme);
};

const detectSystemTheme = (): string => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getSavedTheme = (localStorageKey: string): string | null => {
    return localStorage.getItem(localStorageKey);
};

const saveThemeToLocalStorage = (localStorageKey: string, theme: string): void => {
    localStorage.setItem(localStorageKey, theme);
};

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: string;
    detectPreferences?: boolean;
    localStorageKey?: string;
    themes?: string[];
}

/**
 * A provider component that supplies theme management capabilities to its children.
 *
 * @param {ThemeProviderProps} props - The props for the ThemeProvider component.
 * @param {ReactNode} props.children - The children components that need access to the theme.
 * @param {string} [props.initialTheme='light'] - The default theme to use if no preference is detected or stored.
 * @param {boolean} [props.detectPreferences=true] - Whether to auto-detect the user's system theme.
 * @param {string} [props.localStorageKey='app-theme'] - The key for saving and retrieving the theme from local storage.
 * @param {string[]} [props.themes=['dark', 'light']] - The list of allowed themes.
 *
 * @returns {JSX.Element} - A ThemeProvider wrapper component.
 */
export const ThemeProvider = ({
                                  children,
                                  initialTheme = 'light',
                                  detectPreferences = true,
                                  localStorageKey = 'app-theme',
                                  themes = ['dark', 'light'],
                              }: ThemeProviderProps): JSX.Element => {
    const [currentTheme, setCurrentTheme] = useState<string>(() => {
        const savedTheme = getSavedTheme(localStorageKey);
        if (savedTheme) return savedTheme;
        if (detectPreferences) return detectSystemTheme();
        return initialTheme;
    });

    /**
     * Changes the current theme to the specified new theme.
     * Validates the new theme against the predefined themes before applying it.
     *
     * @param {string} newTheme - The new theme to apply.
     * @returns {void}
     */
    const changeTheme = (newTheme: string): void => {
        if (!themes.includes(newTheme)) {
            console.warn(`Theme "${newTheme}" is not a valid theme.`);
            return;
        }
        setCurrentTheme(newTheme);
    };

    /**
     * Retrieves the available themes.
     *
     * @returns {string[]} - An array of available theme names.
     */
    const getThemes = (): string[] => themes;

    useEffect(() => {
        applyThemeToHtml(currentTheme);
        saveThemeToLocalStorage(localStorageKey, currentTheme);
    }, [currentTheme, localStorageKey]);

    return (
        <ThemeContext.Provider value={{ currentTheme, changeTheme, getThemes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};