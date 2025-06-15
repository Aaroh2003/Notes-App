<!-- src/lib/components/EditModal.svelte -->
<script>
// @ts-nocheck

  import { createEventDispatcher } from 'svelte';
  import NoteForm from './NoteForm.svelte';
  
  export let isOpen = false;
  export let note = null;
  export let isSubmitting = false;
  
  const dispatch = createEventDispatcher();
  
  function handleSubmit(event) {
    dispatch('submit', event.detail);
  }
  
  function handleCancel() {
    dispatch('cancel');
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      handleCancel();
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      handleCancel();
    }
  }
</script>

<!-- Backdrop and Modal -->
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
      <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="modal-title" class="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Note
          </h2>
          <button
            type="button"
            on:click={handleCancel}
            disabled={isSubmitting}
            class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md p-1 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Body -->
        <div class="p-6">
          {#if note}
            <NoteForm
              initialTitle={note.title}
              initialContent={note.content}
              submitButtonText="Update Note"
              {isSubmitting}
              on:submit={handleSubmit}
              on:cancel={handleCancel}
            />
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}