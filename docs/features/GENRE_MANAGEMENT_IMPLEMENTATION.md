# Genre Management System Implementation

## Overview
A complete genre management system that allows administrators to add, disable, and delete music genres. This ensures consistency between the database and frontend components, eliminating potential errors from manual genre entry.

## Components Created

### 1. Frontend Component: `GenreManagement.jsx`
**Location:** `/frontend/src/components/adminComponents/GenreManagement.jsx`

**Features:**
- View all genres (active and disabled)
- Add new genres with duplicate checking
- Toggle genre active/disabled status
- Delete genres (with protection against deleting genres in use)
- Real-time success/error feedback
- Visual distinction between active (green dot) and disabled (gray dot) genres

**API Endpoints Used:**
- `GET /api/admin/genres` - Fetch all genres
- `POST /api/admin/genres` - Add new genre
- `PATCH /api/admin/genres/:id/toggle` - Enable/disable genre
- `DELETE /api/admin/genres/:id` - Delete genre

### 2. Backend Routes: `genre.js`
**Location:** `/backend/routes/genre.js`

**Endpoints:**
- `GET /api/admin/genres` - Get all genres (admin only)
- `GET /api/genres/active` - Get active genres only (public)
- `POST /api/admin/genres` - Create new genre (admin only)
- `PATCH /api/admin/genres/:id/toggle` - Toggle active status (admin only)
- `DELETE /api/admin/genres/:id` - Delete genre (admin only, prevents deletion if in use)

**Protection:**
- Admin-only endpoints protected by `requireAdmin` middleware
- Duplicate checking (case-insensitive)
- Prevents deletion of genres currently assigned to artists

### 3. Database Setup Script: `createGenresTable.js`
**Location:** `/backend/scripts/createGenresTable.js`

**Creates Table:**
```sql
CREATE TABLE genres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (is_active),
  INDEX idx_name (name)
)
```

**Initial Genres:**
- Pop
- Jazz
- Soul
- RnB
- Easy Listening
- Instrumental
- Funk
- Funk Soul

**To Run:**
```bash
cd backend
node scripts/createGenresTable.js
```

### 4. Admin Settings Integration
**Location:** `/frontend/src/components/AdminComponents/AdminSettingsSidebar.jsx`

Added "Genre Management" section to admin settings sidebar with:
- Music icon (i-lucide-music)
- Description: "Manage available music genres"
- Renders GenreManagement component when selected

## Integration with Forms

### Next Steps (To Be Implemented):
To integrate genre selection into artist/album forms:

1. **Fetch Active Genres** in form components:
```javascript
const [genres, setGenres] = useState([]);

useEffect(() => {
  async function fetchGenres() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/genres/active`);
    setGenres(response.data.genres);
  }
  fetchGenres();
}, []);
```

2. **Replace text input with multi-select**:
```javascript
<select 
  multiple 
  value={selectedGenres} 
  onChange={(e) => setSelectedGenres(Array.from(e.target.selectedOptions, option => option.value))}
  className="..."
>
  {genres.map(genre => (
    <option key={genre.id} value={genre.name}>
      {genre.name}
    </option>
  ))}
</select>
```

3. **Store as comma-separated string** (to match current database schema):
```javascript
const genreString = selectedGenres.join(', ');
// Save genreString to database
```

## Database Schema Updates

The `artists` table already has a `genre` column (VARCHAR). The current implementation stores genres as comma-separated strings (e.g., "Pop, Jazz, Soul"), which matches the existing data format.

## Benefits

1. **Consistency**: Ensures all genres across the application are synchronized
2. **Error Prevention**: Eliminates typos and inconsistent genre names
3. **Flexibility**: Admin can add new genres or disable outdated ones without code changes
4. **Protection**: Cannot delete genres currently in use
5. **User-Friendly**: Visual management interface with clear status indicators

## File Changes Summary

**Created:**
- `frontend/src/components/adminComponents/GenreManagement.jsx`
- `backend/routes/genre.js`
- `backend/scripts/createGenresTable.js`

**Modified:**
- `frontend/src/components/AdminComponents/AdminSettingsSidebar.jsx` - Added Genre Management section
- `backend/server.js` - Added genre router import and route registration

## Testing

1. **Access Genre Management:**
   - Login as admin
   - Open Admin Dashboard
   - Click "Settings" button
   - Select "Genre Management" from sidebar

2. **Test Operations:**
   - Add new genre → Should appear in active list
   - Disable genre → Should move to disabled section with strikethrough
   - Enable genre → Should return to active list
   - Delete genre → Should remove from database (if not in use)

3. **Verify API:**
   - Test `GET /api/genres/active` returns only active genres
   - Test admin endpoints require authentication
   - Test duplicate prevention
   - Test deletion protection

## Future Enhancements

1. Add genre icons/colors for visual organization
2. Implement genre categories (e.g., "Electronic", "Acoustic")
3. Add genre usage count (show how many artists use each genre)
4. Export/import genre lists
5. Genre merge functionality (combine similar genres)
