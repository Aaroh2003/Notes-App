// src/lib/stores/theme.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create theme store
function createThemeStore() {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    if (!browser) return 'light';
    
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const { subscribe, set } = writable(getInitialTheme());

  return {
    subscribe,
    
    // Toggle between light and dark
    toggle: () => {
      if (!browser) return;
      
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Update DOM
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', newTheme);
      
      // Update store
      set(newTheme);
    },
    
    // Set specific theme
    setTheme: (theme) => {
      if (!browser) return;
      
      // Update DOM
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
      
      // Update store
      set(theme);
    },
    
    // Initialize theme on app load
    init: () => {
      if (!browser) return;
      
      const theme = getInitialTheme();
      
      // Apply theme to DOM
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      set(theme);
    }
  };
}

export const theme = createThemeStore();