<!-- src/routes/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { notes, loading, error, notesStore } from '$lib/stores/notes.js';
  import NoteCard from '$lib/components/NoteCard.svelte';
  import NoteForm from '$lib/components/NoteForm.svelte';
  import EditModal from '$lib/components/EditModal.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import SearchAndSort from '$lib/components/SearchAndSort.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
  import { theme } from '$lib/stores/theme.js';
  
  // Component state
  let showCreateForm = false;
  let showEditModal = false;
  let showDeleteConfirmation = false;
  let editingNote = null;
  let noteToDelete = null;
  let isSubmitting = false;
  let deletingNoteId = null;
  
  // Search and filter state
  let searchTerm = '';
  let sortBy = 'createdAt';
  let sortOrder = 'desc';
  
  // Pagination state
  let currentPage = 1;
  const itemsPerPage = 20;
  
  // Filtered and sorted notes
  $: filteredNotes = $notes.filter(note => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    return note.title.toLowerCase().includes(searchLower) ||
           note.content.toLowerCase().includes(searchLower);
  });
  
  // Sort filtered notes
  $: sortedNotes = [...filteredNotes].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'content':
        comparison = a.content.length - b.content.length;
        break;
      case 'createdAt':
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  // Paginated notes
  $: totalFilteredNotes = sortedNotes.length;
  $: totalPages = Math.ceil(totalFilteredNotes / itemsPerPage);
  $: paginatedNotes = sortedNotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset to first page when search or sort changes
  $: if (searchTerm || sortBy || sortOrder) {
    currentPage = 1;
  }

  // Load notes when component mounts
  onMount(() => {
    theme.init(); // Initialize theme
    notesStore.loadNotes();
  });
  
  // Handle creating a new note
  async function handleCreateNote(event) {
    isSubmitting = true;
    try {
      await notesStore.createNote(event.detail);
      showCreateForm = false;
    } catch (err) {
      console.error('Failed to create note:', err);
    } finally {
      isSubmitting = false;
    }
  }
  
  // Handle updating a note
  async function handleUpdateNote(event) {
    if (!editingNote) return;
    
    isSubmitting = true;
    try {
      await notesStore.updateNote(editingNote.id, event.detail);
      showEditModal = false;
      editingNote = null;
    } catch (err) {
      console.error('Failed to update note:', err);
    } finally {
      isSubmitting = false;
    }
  }
  
  // Handle deleting a note
  function handleDeleteNote(event) {
    const noteId = event.detail;
    const note = $notes.find(n => n.id === noteId);
    if (note) {
      noteToDelete = note;
      showDeleteConfirmation = true;
    }
  }
  
  // Handle confirmed deletion
  async function handleConfirmDelete() {
    if (!noteToDelete) return;
    
    deletingNoteId = noteToDelete.id;
    
    try {
      await notesStore.deleteNote(noteToDelete.id);
      showDeleteConfirmation = false;
      noteToDelete = null;
      
      // Adjust current page if we deleted the last item on the page
      const newTotalPages = Math.ceil((totalFilteredNotes - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        currentPage = newTotalPages;
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
    } finally {
      deletingNoteId = null;
    }
  }
  
  // Handle canceling deletion
  function handleCancelDelete() {
    showDeleteConfirmation = false;
    noteToDelete = null;
  }
  
  // Handle editing a note
  function handleEditNote(event) {
    editingNote = event.detail;
    showEditModal = true;
  }
  
  // Handle canceling create form
  function handleCancelCreate() {
    showCreateForm = false;
  }
  
  // Handle canceling edit modal
  function handleCancelEdit() {
    showEditModal = false;
    editingNote = null;
  }
  
  // Handle search
  function handleSearch(event) {
    searchTerm = event.detail;
  }
  
  // Handle sort
  function handleSort(event) {
    const { sortBy: newSortBy, sortOrder: newSortOrder } = event.detail;
    sortBy = newSortBy;
    sortOrder = newSortOrder;
  }
  
  // Handle page change
  function handlePageChange(event) {
    currentPage = event.detail;
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Handle clearing error
  function handleClearError() {
    notesStore.clearError();
  }
  
  // Handle retry loading notes
  function handleRetry() {
    notesStore.loadNotes();
  }
</script>

<svelte:head>
  <title>Notes App</title>
  <meta name="description" content="A simple notes management application" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
  <!-- Header -->
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          📝 Notes App
        </h1>
        
        <div class="flex items-center gap-3">
          <ThemeToggle />
          
          <button
            type="button"
            on:click={() => showCreateForm = !showCreateForm}
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            {showCreateForm ? 'Cancel' : 'New Note'}
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Error Message -->
    {#if $error}
      <div class="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span>{$error}</span>
          </div>
          <div class="flex gap-2">
            <button
              type="button"
              on:click={handleRetry}
              class="text-sm underline hover:no-underline"
            >
              Retry
            </button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
              type="button"
              on:click={handleClearError}
              class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- Search and Sort Controls -->
    {#if $notes.length > 0}
      <SearchAndSort
        bind:searchTerm
        bind:sortBy
        bind:sortOrder
        totalNotes={$notes.length}
        filteredNotes={totalFilteredNotes}
        on:search={handleSearch}
        on:sort={handleSort}
      />
    {/if}

    <!-- Create Note Form -->
    {#if showCreateForm}
      <div class="mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Note</h2>
          <NoteForm
            {isSubmitting}
            on:submit={handleCreateNote}
            on:cancel={handleCancelCreate}
          />
        </div>
      </div>
    {/if}

    <!-- Loading State -->
    {#if $loading && $notes.length === 0}
      <div class="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <p class="mt-3 text-gray-600 dark:text-gray-400">Loading notes...</p>
      </div>
    
    <!-- Empty State -->
    {:else if !$loading && $notes.length === 0}
      <div class="flex flex-col items-center justify-center py-12">
        <div class="text-gray-400 dark:text-gray-500 mb-4">
          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No notes yet</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-sm">
          Get started by creating your first note. Click the "New Note" button above to begin.
        </p>
        <button
          type="button"
          on:click={() => showCreateForm = true}
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Create Your First Note
        </button>
      </div>
    
    <!-- No Search Results -->
    {:else if totalFilteredNotes === 0}
      <div class="flex flex-col items-center justify-center py-12">
        <div class="text-gray-400 dark:text-gray-500 mb-4">
          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No notes found</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-sm">
          No notes match your search criteria. Try adjusting your search terms or filters.
        </p>
        <button
          type="button"
          on:click={() => searchTerm = ''}
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
        >
          Clear Search
        </button>
      </div>
    
    <!-- Notes Grid -->
    {:else}
      <div class="space-y-4">
        <!-- Notes Count -->
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {#if searchTerm}
              Showing {totalFilteredNotes} of {$notes.length} notes
            {:else}
              Page {currentPage} of {totalPages} • {totalFilteredNotes} {totalFilteredNotes === 1 ? 'note' : 'notes'} total
            {/if}
          </p>
          {#if $loading}
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <LoadingSpinner size="sm" />
              <span>Updating...</span>
            </div>
          {/if}
        </div>
        
        <!-- Notes List -->
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {#each paginatedNotes as note (note.id)}
            <NoteCard
              {note}
              isDeleting={deletingNoteId === note.id}
              on:edit={handleEditNote}
              on:delete={handleDeleteNote}
            />
          {/each}
        </div>
        
        <!-- Pagination -->
        {#if totalPages > 1}
          <Pagination
            bind:currentPage
            totalItems={totalFilteredNotes}
            {itemsPerPage}
            on:pageChange={handlePageChange}
          />
        {/if}
      </div>
    {/if}
  </main>
</div>

<!-- Edit Modal -->
<EditModal
  isOpen={showEditModal}
  note={editingNote}
  {isSubmitting}
  on:submit={handleUpdateNote}
  on:cancel={handleCancelEdit}
/>

<!-- Delete Confirmation Modal -->
<ConfirmationModal
  isOpen={showDeleteConfirmation}
  title="Delete Note"
  message={noteToDelete ? `Are you sure you want to delete "${noteToDelete.title}"? This action cannot be undone.` : ''}
  confirmText="Delete"
  cancelText="Cancel"
  type="danger"
  isLoading={Boolean(deletingNoteId)}
  on:confirm={handleConfirmDelete}
  on:cancel={handleCancelDelete}
/>