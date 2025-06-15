// src/lib/stores/notes.js
import { writable } from 'svelte/store';
import notesAPI from '../api/notes.js';

// Create reactive stores
export const notes = writable([]);
export const loading = writable(false);
export const error = writable(null);

// Helper function to handle errors
const handleError = (err) => {
  console.error(err);
  error.set(err.message || 'An error occurred');
  loading.set(false);
};

// Store actions
export const notesStore = {
  // Load all notes
  async loadNotes() {
    loading.set(true);
    error.set(null);
    
    try {
      const fetchedNotes = await notesAPI.getAllNotes();
      notes.set(fetchedNotes);
    } catch (err) {
      handleError(err);
    } finally {
      loading.set(false);
    }
  },

  // Create a new note
  async createNote(noteData) {
    loading.set(true);
    error.set(null);

    try {
      const newNote = await notesAPI.createNote(noteData);
      // @ts-ignore
      notes.update(currentNotes => [newNote, ...currentNotes]);
      return newNote;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      loading.set(false);
    }
  },

  // Update an existing note
  async updateNote(id, noteData) {
    loading.set(true);
    error.set(null);

    try {
      const updatedNote = await notesAPI.updateNote(id, noteData);
      notes.update(currentNotes => 
        // @ts-ignore
        currentNotes.map(note => 
          // @ts-ignore
          note.id === id ? updatedNote : note
        )
      );
      return updatedNote;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      loading.set(false);
    }
  },

  // Delete a note
  async deleteNote(id) {
    loading.set(true);
    error.set(null);

    try {
      await notesAPI.deleteNote(id);
      notes.update(currentNotes => 
        // @ts-ignore
        currentNotes.filter(note => note.id !== id)
      );
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      loading.set(false);
    }
  },

  // Clear error
  clearError() {
    error.set(null);
  }
};