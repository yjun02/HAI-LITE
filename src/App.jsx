import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { themes } from './utils/themes';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Viewer from './pages/Viewer';
import './App.css'

function ThemeSelector() {
  const { currentTheme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '0.5rem 1rem',
          background: 'var(--cardBg)',
          border: '2px solid var(--borderLight)',
          borderRadius: '6px',
          color: 'var(--textPrimary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--inputBg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--cardBg)';
        }}
      >
        🎨 {themes[currentTheme]?.name || 'Theme'}
        <span style={{ fontSize: '0.7rem' }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              right: 0,
              background: 'var(--bgSecondary)',
              border: '1px solid var(--borderLight)',
              borderRadius: '8px',
              padding: '0.5rem',
              minWidth: '180px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              zIndex: 999
            }}
          >
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => {
                  changeTheme(key);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: currentTheme === key ? 'var(--accentDim)' : 'transparent',
                  border: currentTheme === key ? '1px solid var(--accent)' : '1px solid transparent',
                  borderRadius: '6px',
                  color: currentTheme === key ? 'var(--accent)' : 'var(--textPrimary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: '0.25rem',
                  fontSize: '0.9rem',
                  fontWeight: currentTheme === key ? '600' : '400',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (currentTheme !== key) {
                    e.currentTarget.style.background = 'var(--inputBg)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentTheme !== key) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function AppContent() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/" className="brand">HAI-LITE</Link>
            <ThemeSelector />
          </div>
          <div className="links">
            <Link style={{ fontSize: '1.5rem', fontWeight: 'bold', border: '2px solid var(--borderLight)', borderRadius: '8px', padding: '0.4rem 1rem', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none', margin: '5px', color: 'var(--textPrimary), background: var(--bgSecondary)' }} to="/builder">Builder</Link>
            <Link style={{ fontSize: '1.5rem', fontWeight: 'bold', border: '2px solid var(--borderLight)', borderRadius: '8px', padding: '0.4rem 1rem', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none', margin: '5px', color: 'var(--textPrimary)' }} to="/viewer">Viewer</Link>
          </div>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/viewer" element={<Viewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
