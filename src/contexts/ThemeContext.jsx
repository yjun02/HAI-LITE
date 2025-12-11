import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTheme, applyTheme } from '../utils/themes';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('dark-cyan');

    // Load theme from cookie on mount
    useEffect(() => {
        const savedTheme = getCookie('theme');
        if (savedTheme) {
            setCurrentTheme(savedTheme);
            applyTheme(getTheme(savedTheme));
        } else {
            applyTheme(getTheme('dark-cyan'));
        }
    }, []);

    const changeTheme = (themeName) => {
        setCurrentTheme(themeName);
        applyTheme(getTheme(themeName));
        setCookie('theme', themeName, 365); // Save for 1 year
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Cookie utilities
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
