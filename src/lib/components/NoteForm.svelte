<!-- src/lib/components/NoteForm.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  
  export let isSubmitting = false;
  export let initialTitle = '';
  export let initialContent = '';
  export let submitButtonText = 'Create Note';
  
  let title = initialTitle;
  let content = initialContent;
  let titleError = '';
  let contentError = '';
  
  const dispatch = createEventDispatcher();
  
  function validateForm() {
    titleError = '';
    contentError = '';
    
    if (!title.trim()) {
      titleError = 'Title is required';
    } else if (title.trim().length < 3) {
      titleError = 'Title must be at least 3 characters';
    } else if (title.trim().length > 100) {
      titleError = 'Title must be less than 100 characters';
    }
    
    if (!content.trim()) {
      contentError = 'Content is required';
    } else if (content.trim().length < 10) {
      contentError = 'Content must be at least 10 characters';
    } else if (content.trim().length > 1000) {
      contentError = 'Content must be less than 1000 characters';
    }
    
    return !titleError && !contentError;
  }
  
  function handleSubmit() {
    if (!validateForm() || isSubmitting) return;
    
    dispatch('submit', {
      title: title.trim(),
      content: content.trim()
    });
  }
  
  function handleCancel() {
    dispatch('cancel');
  }
  
  // Reset form when initial values change
  $: {
    title = initialTitle;
    content = initialContent;
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <div>
    <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
      Title
    </label>
    <input
      id="title"
      type="text"
      bind:value={title}
      placeholder="Enter note title..."
      disabled={isSubmitting}
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      class:border-red-500={titleError}
    />
    {#if titleError}
      <p class="mt-1 text-sm text-red-600">{titleError}</p>
    {/if}
  </div>
  
  <div>
    <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
      Content
    </label>
    <textarea
      id="content"
      bind:value={content}
      placeholder="Enter note content..."
      rows="4"
      disabled={isSubmitting}
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
      class:border-red-500={contentError}
    ></textarea>
    {#if contentError}
      <p class="mt-1 text-sm text-red-600">{contentError}</p>
    {/if}
  </div>
  
  <div class="flex gap-3 pt-2">
    <button
      type="submit"
      disabled={isSubmitting}
      class="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
    >
      {#if isSubmitting}
        <LoadingSpinner size="sm" color="white" />
      {/if}
      {submitButtonText}
    </button>
    
    <button
      type="button"
      on:click={handleCancel}
      disabled={isSubmitting}
      class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Cancel
    </button>
  </div>
</form>