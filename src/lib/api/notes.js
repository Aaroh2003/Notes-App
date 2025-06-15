// src/lib/api/notes.js
const API_BASE_URL = 'https://684e9802f0c9c9848d288efd.mockapi.io/api/v1'; // Replace with your MockAPI URL

class NotesAPI {
  async getAllNotes() {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  }

  async createNote(noteData) {
    try {
      // Add current timestamp to the note data
      const noteWithTimestamp = {
        ...noteData,
        createdAt: new Date().toISOString()
      };
      
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteWithTimestamp),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  }

  async updateNote(id, noteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  async deleteNote(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
}

export default new NotesAPI();