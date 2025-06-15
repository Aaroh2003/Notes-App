<!-- src/lib/components/NoteCard.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let note;
  export let isDeleting = false;
  
  const dispatch = createEventDispatcher();
  
  function handleEdit() {
    dispatch('edit', note);
  }
  
  function handleDelete() {
    dispatch('delete', note.id);
  }
  
  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  }
  
  // Truncate content if it's too long
  function truncateContent(content, maxLength = 150) {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-200 p-4">
  <!-- Header -->
  <div class="flex items-start justify-between mb-3">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-2 break-words">
      {note.title}
    </h3>
    
    <!-- Action Buttons -->
    <div class="flex gap-2 flex-shrink-0">
      <button
        type="button"
        on:click={handleEdit}
        disabled={isDeleting}
        class="p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Edit note"
        title="Edit note"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      </button>
      
      <button
        type="button"
        on:click={handleDelete}
        disabled={isDeleting}
        class="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Delete note"
        title="Delete note"
      >
        {#if isDeleting}
          <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        {:else}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        {/if}
      </button>
    </div>
  </div>
  
  <!-- Content -->
  <div class="mb-4">
    <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
      {truncateContent(note.content)}
    </p>
  </div>
  
  <!-- Footer -->
  <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
    <span>
      Created: {formatDate(note.createdAt)}
    </span>
    <span class="text-gray-400 dark:text-gray-500">
      ID: {note.id}
    </span>
  </div>
</div>