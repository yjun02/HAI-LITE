// Theme definitions
export const themes = {
    'dark-cyan': {
        name: 'Dark Cyan (default)',
        colors: {
            // Background colors
            bgPrimary: '#121212',
            bgSecondary: '#1e1e1e',
            bgTertiary: '#2a2a2a',
            
            // Accent colors
            accent: '#00e5ff',
            accentHover: '#00d4eb',
            accentDim: 'rgba(0, 229, 255, 0.1)',
            
            // Secondary accent
            secondary: '#ff007a',
            secondaryHover: '#e6006d',
            
            // Text colors
            textPrimary: '#ffffff',
            textSecondary: '#b0b0b0',
            textDim: '#888888',
            
            // Border colors
            border: '#333333',
            borderLight: 'rgba(255, 255, 255, 0.1)',
            borderDashed: 'rgba(255, 255, 255, 0.2)',
            
            // Component colors
            cardBg: 'rgba(0, 0, 0, 0.3)',
            cardBorder: 'rgba(255, 255, 255, 0.1)',
            inputBg: 'rgba(255, 255, 255, 0.05)',
        }
    },
    'dark-green': {
        name: 'Dark Green',
        colors: {
            bgPrimary: '#0a1612',
            bgSecondary: '#162420',
            bgTertiary: '#1f332d',
            
            accent: '#00ff88',
            accentHover: '#00e67a',
            accentDim: 'rgba(0, 255, 136, 0.1)',
            
            secondary: '#ff6b35',
            secondaryHover: '#e65f30',
            
            textPrimary: '#e8f5e9',
            textSecondary: '#a5d6a7',
            textDim: '#66bb6a',
            
            border: '#2e4d3d',
            borderLight: 'rgba(0, 255, 136, 0.1)',
            borderDashed: 'rgba(0, 255, 136, 0.2)',
            
            cardBg: 'rgba(0, 255, 136, 0.05)',
            cardBorder: 'rgba(0, 255, 136, 0.15)',
            inputBg: 'rgba(0, 255, 136, 0.05)',
        }
    },
    'light-pink': {
        name: 'Light Pink',
        colors: {
            bgPrimary: '#fef5f8',
            bgSecondary: '#fff0f5',
            bgTertiary: '#ffe4ec',
            
            accent: '#ff1493',
            accentHover: '#e6127f',
            accentDim: 'rgba(255, 20, 147, 0.1)',
            
            secondary: '#9c27b0',
            secondaryHover: '#8e24aa',
            
            textPrimary: '#2d1b2e',
            textSecondary: '#6d4c7d',
            textDim: '#9575a3',
            
            border: '#f8bbd0',
            borderLight: 'rgba(255, 20, 147, 0.2)',
            borderDashed: 'rgba(255, 20, 147, 0.3)',
            
            cardBg: 'rgba(255, 20, 147, 0.05)',
            cardBorder: 'rgba(255, 20, 147, 0.2)',
            inputBg: 'rgba(255, 20, 147, 0.05)',
        }
    },
    'light-blue': {
        name: 'Light Blue',
        colors: {
            bgPrimary: '#f0f7ff',
            bgSecondary: '#e3f2fd',
            bgTertiary: '#d1e9ff',
            
            accent: '#2196f3',
            accentHover: '#1e88e5',
            accentDim: 'rgba(33, 150, 243, 0.1)',
            
            secondary: '#ff9800',
            secondaryHover: '#f57c00',
            
            textPrimary: '#1a237e',
            textSecondary: '#3f51b5',
            textDim: '#7986cb',
            
            border: '#90caf9',
            borderLight: 'rgba(33, 150, 243, 0.2)',
            borderDashed: 'rgba(33, 150, 243, 0.3)',
            
            cardBg: 'rgba(33, 150, 243, 0.05)',
            cardBorder: 'rgba(33, 150, 243, 0.2)',
            inputBg: 'rgba(33, 150, 243, 0.05)',
        }
    },
    'dark-purple': {
        name: 'Dark Purple',
        colors: {
            bgPrimary: '#1a0f2e',
            bgSecondary: '#261745',
            bgTertiary: '#33205c',
            
            accent: '#bb86fc',
            accentHover: '#a76fe8',
            accentDim: 'rgba(187, 134, 252, 0.1)',
            
            secondary: '#03dac6',
            secondaryHover: '#02c4b3',
            
            textPrimary: '#e8def8',
            textSecondary: '#cbb5e8',
            textDim: '#9d7fc9',
            
            border: '#4a3a6b',
            borderLight: 'rgba(187, 134, 252, 0.1)',
            borderDashed: 'rgba(187, 134, 252, 0.2)',
            
            cardBg: 'rgba(187, 134, 252, 0.05)',
            cardBorder: 'rgba(187, 134, 252, 0.15)',
            inputBg: 'rgba(187, 134, 252, 0.05)',
        }
    },
    'cyberpunk-sunset': {
        name: 'Cyberpunk Sunset',
        colors: {
            // Background colors
            bgPrimary: '#0c0c20',
            bgSecondary: '#1a1a3a',
            bgTertiary: '#2b2b4e',

            // Accent colors (Orange)
            accent: '#ff7043', 
            accentHover: '#e6653d',
            accentDim: 'rgba(255, 112, 67, 0.15)',

            // Secondary accent (Green)
            secondary: '#00e676',
            secondaryHover: '#00d46d',

            // Text colors
            textPrimary: '#e6e6fa',
            textSecondary: '#cbb6e8',
            textDim: '#a795c9',

            // Border colors
            border: '#3a3a5f',
            borderLight: 'rgba(255, 112, 67, 0.2)',
            borderDashed: 'rgba(255, 112, 67, 0.3)',

            // Component colors
            cardBg: 'rgba(26, 26, 58, 0.7)',
            cardBorder: 'rgba(255, 112, 67, 0.3)',
            inputBg: 'rgba(255, 112, 67, 0.05)',
        }
    },
    'minimalist-paper': {
        name: 'Minimalist Paper',
        colors: {
            bgPrimary: '#fafafa',
            bgSecondary: '#f0f0f0',
            bgTertiary: '#ffffff',

            // Accent colors (Blue)
            accent: '#1976d2', 
            accentHover: '#1565c0',
            accentDim: 'rgba(25, 118, 210, 0.1)',

            // Secondary accent (Red)
            secondary: '#d32f2f',
            secondaryHover: '#c62828',

            // Text colors
            textPrimary: '#212121',
            textSecondary: '#424242',
            textDim: '#757575',

            // Border colors
            border: '#bbdefb',
            borderLight: 'rgba(25, 118, 210, 0.2)',
            borderDashed: 'rgba(25, 118, 210, 0.3)',

            // Component colors
            cardBg: 'rgba(255, 255, 255, 0.8)',
            cardBorder: 'rgba(25, 118, 210, 0.2)',
            inputBg: 'rgba(255, 255, 255, 0.9)',
        }
    },
    'high-contrast-teal': {
        name: 'High Contrast Teal',
        colors: {
            bgPrimary: '#080808',
            bgSecondary: '#181818',
            bgTertiary: '#242424',

            // Accent colors (Teal)
            accent: '#1de9b6', 
            accentHover: '#17b38d',
            accentDim: 'rgba(29, 233, 182, 0.15)',

            // Secondary accent (Pink)
            secondary: '#f50057',
            secondaryHover: '#c50046',

            // Text colors
            textPrimary: '#ffffff',
            textSecondary: '#bdbdbd',
            textDim: '#757575',

            // Border colors
            border: '#4db6ac',
            borderLight: 'rgba(29, 233, 182, 0.2)',
            borderDashed: 'rgba(29, 233, 182, 0.3)',

            // Component colors
            cardBg: 'rgba(24, 24, 24, 0.7)',
            cardBorder: 'rgba(29, 233, 182, 0.25)',
            inputBg: 'rgba(29, 233, 182, 0.05)',
        }
    }
};

export const getTheme = (themeName) => {
    return themes[themeName] || themes['dark-cyan'];
};

export const applyTheme = (theme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
};
