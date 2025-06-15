<!-- src/lib/components/Pagination.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let currentPage = 1;
  export let totalItems = 0;
  export let itemsPerPage = 20;
  
  const dispatch = createEventDispatcher();
  
  $: totalPages = Math.ceil(totalItems / itemsPerPage);
  $: startItem = (currentPage - 1) * itemsPerPage + 1;
  $: endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  // Generate page numbers to show
  $: pageNumbers = (() => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      // Adjust start if we're near the end
      const adjustedStart = Math.max(1, end - maxVisible + 1);
      
      for (let i = adjustedStart; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  })();
  
  function goToPage(page) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      currentPage = page;
      dispatch('pageChange', page);
    }
  }
  
  function previousPage() {
    goToPage(currentPage - 1);
  }
  
  function nextPage() {
    goToPage(currentPage + 1);
  }
</script>

{#if totalPages > 1}
  <div class="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-b-lg transition-colors">
    <div class="flex items-center justify-between">
      
      <!-- Mobile Pagination -->
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          type="button"
          on:click={previousPage}
          disabled={currentPage === 1}
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          type="button"
          on:click={nextPage}
          disabled={currentPage === totalPages}
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
      
      <!-- Desktop Pagination -->
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            Showing <span class="font-medium">{startItem}</span> to <span class="font-medium">{endItem}</span> of{' '}
            <span class="font-medium">{totalItems}</span> results
          </p>
        </div>
        
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <!-- Previous Button -->
            <button
              type="button"
              on:click={previousPage}
              disabled={currentPage === 1}
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <!-- First Page -->
            {#if pageNumbers[0] > 1}
              <button
                type="button"
                on:click={() => goToPage(1)}
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                1
              </button>
              {#if pageNumbers[0] > 2}
                <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                  ...
                </span>
              {/if}
            {/if}
            
            <!-- Page Numbers -->
            {#each pageNumbers as page}
              <button
                type="button"
                on:click={() => goToPage(page)}
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors
                  {page === currentPage 
                    ? 'z-10 bg-blue-50 dark:bg-blue-900/50 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }"
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            {/each}
            
            <!-- Last Page -->
            {#if pageNumbers[pageNumbers.length - 1] < totalPages}
              {#if pageNumbers[pageNumbers.length - 1] < totalPages - 1}
                <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                  ...
                </span>
              {/if}
              <button
                type="button"
                on:click={() => goToPage(totalPages)}
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                {totalPages}
              </button>
            {/if}
            
            <!-- Next Button -->
            <button
              type="button"
              on:click={nextPage}
              disabled={currentPage === totalPages}
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
{/if}