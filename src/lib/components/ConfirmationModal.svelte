<!-- src/lib/components/ConfirmationModal.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  
  export let isOpen = false;
  export let title = 'Confirm Action';
  export let message = 'Are you sure you want to proceed?';
  export let confirmText = 'Confirm';
  export let cancelText = 'Cancel';
  export let isLoading = false;
  export let type = 'danger'; // 'danger', 'warning', 'info'
  
  const dispatch = createEventDispatcher();
  
  function handleConfirm() {
    dispatch('confirm');
  }
  
  function handleCancel() {
    dispatch('cancel');
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && !isLoading) {
      handleCancel();
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape' && !isLoading) {
      handleCancel();
    }
  }
  
  $: iconColor = type === 'danger' ? 'text-red-600 dark:text-red-400' : 
                 type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 
                 'text-blue-600 dark:text-blue-400';
  
  $: confirmButtonClass = type === 'danger' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' :
                          type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500' :
                          'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
</script>

<!-- Modal -->
{#if isOpen}
  <div 
    class="fixed inset-0 z-50 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 transition-opacity"
      on:click={handleBackdropClick}
      on:keydown={handleKeydown}
    ></div>
    
    <!-- Modal Container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <!-- Modal Content -->
      <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <!-- Icon and Title -->
          <div class="flex items-center mb-4">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4 sm:mb-0 sm:mr-4 sm:h-10 sm:w-10">
              {#if type === 'danger'}
                <svg class="h-6 w-6 {iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              {:else if type === 'warning'}
                <svg class="h-6 w-6 {iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              {:else}
                <svg class="h-6 w-6 {iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              {/if}
            </div>
            
            <div class="text-center sm:text-left">
              <h3 id="modal-title" class="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
          </div>
          
          <!-- Message -->
          <div class="mb-6">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
          </div>
          
          <!-- Buttons -->
          <div class="flex flex-col-reverse sm:flex-row sm:gap-3">
            <button
              type="button"
              on:click={handleCancel}
              disabled={isLoading}
              class="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors sm:text-sm"
            >
              {cancelText}
            </button>
            
            <button
              type="button"
              on:click={handleConfirm}
              disabled={isLoading}
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 {confirmButtonClass} text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors sm:text-sm"
            >
              {#if isLoading}
                <LoadingSpinner size="sm" color="white" />
                <span class="ml-2">Processing...</span>
              {:else}
                {confirmText}
              {/if}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}