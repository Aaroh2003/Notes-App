<!-- src/lib/components/ThemeToggle.svelte -->
<script>
  import { theme } from '$lib/stores/theme.js';
  
  function toggleTheme() {
    theme.toggle();
  }
</script>

<button
  type="button"
  on:click={toggleTheme}
  class="relative p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800 rounded-md transition-colors"
  aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  title={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  <!-- Sun Icon (shown in dark mode) -->
  <svg
    class="w-5 h-5 {$theme === 'dark' ? 'block' : 'hidden'}"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    ></path>
  </svg>
  
  <!-- Moon Icon (shown in light mode) -->
  <svg
    class="w-5 h-5 {$theme === 'light' ? 'block' : 'hidden'}"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    ></path>
  </svg>
</button>