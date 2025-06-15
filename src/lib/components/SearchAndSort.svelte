<!-- src/lib/components/SearchAndSort.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let searchTerm = '';
  export let sortBy = 'createdAt';
  export let sortOrder = 'desc';
  export let totalNotes = 0;
  export let filteredNotes = 0;
  
  const dispatch = createEventDispatcher();
  
  const sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'title', label: 'Title' },
    { value: 'content', label: 'Content Length' }
  ];
  
  function handleSearchInput(event) {
    const value = event.target.value;
    searchTerm = value;
    dispatch('search', value);
  }
  
  function handleSortChange(event) {
    const value = event.target.value;
    sortBy = value;
    dispatch('sort', { sortBy: value, sortOrder });
  }
  
  function toggleSortOrder() {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch('sort', { sortBy, sortOrder });
  }
  
  function clearSearch() {
    searchTerm = '';
    dispatch('search', '');
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 transition-colors">
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
    
    <!-- Search Box -->
    <div class="flex-1 w-full sm:w-auto">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search notes by title..."
          value={searchTerm}
          on:input={handleSearchInput}
          class="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        {#if searchTerm}
          <button
            type="button"
            on:click={clearSearch}
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        {/if}
      </div>
    </div>
    
    <!-- Sort Controls -->
    <div class="flex items-center gap-2 w-full sm:w-auto">
      <label for="sort-select" class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
        Sort by:
      </label>
      <select
        id="sort-select"
        bind:value={sortBy}
        on:change={handleSortChange}
        class="block w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
      >
        {#each sortOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
      
      <button
        type="button"
        on:click={toggleSortOrder}
        class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
        aria-label={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
        title={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
      >
        {#if sortOrder === 'asc'}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
          </svg>
        {:else}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
          </svg>
        {/if}
      </button>
    </div>
  </div>
  
  <!-- Results Summary -->
  {#if searchTerm}
    <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredNotes} of {totalNotes} notes
        {#if filteredNotes === 0}
          <span class="text-gray-500 dark:text-gray-500">- try adjusting your search</span>
        {/if}
      </p>
    </div>
  {/if}
</div>