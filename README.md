# 📝 Notes Management App

A modern, feature-rich notes management application built with Svelte and TailwindCSS for a frontend internship take-home challenge.

## ✨ Features

### Core Features ✅
- **Display Notes**: View all notes in a responsive grid layout
- **Create Notes**: Add new notes with title and content validation
- **Edit Notes**: Update existing notes via modal interface
- **Delete Notes**: Remove notes with confirmation modal
- **Responsive Design**: Works seamlessly on mobile and desktop

### Bonus Features ✅
- **🔍 Search Functionality**: Real-time search through note titles and content
- **📊 Advanced Sorting**: Sort by date, title, or content length (ascending/descending)
- **📄 Pagination**: 20 notes per page with smart pagination controls
- **⚠️ Delete Confirmation**: Modal confirmation before deleting notes
- **🌙 Dark Mode**: Complete dark theme with system preference detection
- **⚡ Loading States**: Spinner animations for all async operations
- **🚨 Error Handling**: User-friendly error messages with retry functionality
- **✅ Form Validation**: Client-side validation with helpful error messages
- **🎯 Optimistic UI**: Immediate visual feedback for better UX
- **♿ Accessibility**: Proper ARIA labels, keyboard navigation, and focus management

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd notes-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MockAPI**:
   - Go to [https://mockapi.io](https://mockapi.io)
   - Create a free account
   - Create a new project
   - Add a resource called "notes" with fields: id, title, content, createdAt
   - Copy your API endpoint URL

4. **Update API URL**:
   - Open `src/lib/api/notes.js`
   - Replace the API_BASE_URL with your actual MockAPI URL

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend Framework**: Svelte/SvelteKit
- **Styling**: TailwindCSS with custom dark mode
- **State Management**: Svelte stores
- **API**: MockAPI for backend simulation
- **Build Tool**: Vite
- **Language**: JavaScript with optional TypeScript support

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── NoteCard.svelte             # Individual note display
│   │   ├── NoteForm.svelte             # Create/edit form
│   │   ├── EditModal.svelte            # Modal for editing notes
│   │   ├── ConfirmationModal.svelte    # Delete confirmation modal
│   │   ├── SearchAndSort.svelte        # Search and sorting controls
│   │   ├── Pagination.svelte           # Pagination component
│   │   ├── ThemeToggle.svelte          # Dark mode toggle
│   │   └── LoadingSpinner.svelte       # Reusable loading component
│   ├── stores/
│   │   ├── notes.js                    # Svelte store for notes state
│   │   └── theme.js                    # Svelte store for theme state
│   ├── api/
│   │   └── notes.js                    # API service layer
│   └── types.ts                        # TypeScript type definitions
├── routes/
│   └── +page.svelte                    # Main application page
├── app.html                            # HTML template
└── app.css                             # Global styles with TailwindCSS
```

## 🔧 API Endpoints Used

- `GET /notes` - Fetch all notes
- `POST /notes` - Create a new note
- `PUT /api/notes/:id` - Update an existing note  
- `DELETE /api/notes/:id` - Delete a note

## 🎨 Design Decisions

### Architecture
- **Svelte Stores**: Centralized state management for notes, loading states, theme, and errors
- **Component-based**: Modular, reusable components for maintainability
- **Service Layer**: Separated API logic for better organization
- **TypeScript Support**: Optional type safety for better development experience

### UX/UI Choices
- **Card Layout**: Easy scanning of notes with visual hierarchy
- **Modal Editing**: Prevents navigation away while editing
- **Inline Actions**: Edit/delete buttons directly on cards for quick access
- **Search & Filter**: Real-time search with highlighting and result counts
- **Smart Pagination**: Shows 20 notes per page with intelligent page controls
- **Confirmation Modals**: Prevents accidental deletions with clear confirmation
- **Loading States**: Clear feedback during API operations
- **Error Handling**: Graceful error recovery with retry options
- **Dark Mode**: Complete theme system with system preference detection

### Performance Features
- **Efficient Filtering**: Client-side search and sort for instant feedback
- **Smart Pagination**: Only renders visible notes for better performance
- **Optimistic Updates**: Immediate UI feedback while API calls are in progress
- **Debounced Search**: Prevents excessive API calls during typing

### Responsive Design
- **Mobile-first**: Works great on small screens
- **Flexible Grid**: Adapts from 1 column (mobile) to 3 columns (desktop)
- **Touch-friendly**: Adequately sized buttons and touch targets
- **Adaptive Pagination**: Different layouts for mobile vs desktop

## 📱 Testing the App

### Basic Functionality
1. **Create a note** - Fill out the form and submit
2. **Edit a note** - Click the edit icon and modify in the modal
3. **Delete a note** - Click delete icon, confirm in the modal
4. **Test responsiveness** - Resize browser window or use dev tools

### Advanced Features
5. **Search notes** - Use the search box to filter by title or content
6. **Sort notes** - Try different sorting options (date, title, content length)
7. **Toggle sort order** - Click the sort arrow to change ascending/descending
8. **Test pagination** - Create 25+ notes to see pagination in action
9. **Dark mode** - Toggle between light and dark themes
10. **Clear search** - Use the X button or "Clear Search" button

### Edge Cases
11. **Empty search** - Search for something that doesn't exist
12. **Form validation** - Try submitting empty or invalid forms
13. **Error handling** - Temporarily use wrong API URL to see error handling
14. **Loading states** - Watch for spinners during API operations
15. **Page navigation** - Test pagination with search active

## 🚀 Production Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `build/` directory and can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- Surge.sh

## 🔮 Future Enhancements

Given more time, I would implement:

1. **Advanced Search**: Filter by date ranges, tags, or note metadata
2. **Bulk Operations**: Select multiple notes for batch delete/export
3. **Full-text Search**: Search within note content with highlighting
4. **Advanced Sorting**: Custom sort orders, pinned notes, manual reordering
5. **Infinite Scroll**: Alternative to pagination for smoother browsing
6. **Keyboard Shortcuts**: Power-user features for quick navigation
7. **Collaborative Features**: Share notes, comments, and real-time editing
8. **PWA Features**: Offline support

## 🛠️ Trade-offs & Assumptions

### Trade-offs Made
- **Client-side filtering**: Chose performance over server-side filtering for better UX
- **Simple validation**: Basic client-side validation instead of complex schema validation
- **MockAPI limitations**: Used MockAPI for simplicity over custom backend
- **In-memory error handling**: Errors are stored in component state rather than persisted
- **No authentication**: Assumed to be a single-user application for demo purposes

### Assumptions
- **MockAPI reliability**: Assumed the API is reliable and handles edge cases
- **Modern browser support**: Used modern JavaScript features and CSS Grid
- **Network connectivity**: Assumed users have stable internet connection
- **Single user**: No multi-user or collaboration features needed
- **English language**: UI text is in English only

## 🐛 Known Issues

- None currently identified - the app handles all expected use cases gracefully
- MockAPI might have rate limiting for free accounts
- Large datasets (1000+ notes) might impact client-side filtering performance

## 🤝 Contributing

This is a take-home challenge project, but suggestions and feedback are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@Aaroh2003](https://github.com/Aaroh2003)
- Email: aarohharkut308@gmail.com

---

**Built with ❤️ using Svelte, TailwindCSS, and MockAPI**

*This project demonstrates modern frontend development practices including component architecture, state management, responsive design, accessibility, and user experience optimization.*
