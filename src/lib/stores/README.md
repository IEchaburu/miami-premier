# Filter State Management Architecture

## Overview

This project uses a **hybrid approach** for filter state management that prioritizes SEO while maintaining clean, maintainable code.

## Architecture

### 1. URL Params (Source of Truth)
- **Purpose**: Store actual filter values for SEO, shareability, and bookmarking
- **Used by**: Server Components (`page.tsx`) for initial data fetching
- **Benefits**: 
  - Search engines can index filtered pages
  - Users can share/bookmark specific filter combinations
  - Browser back/forward navigation works correctly

### 2. Zustand Store (UI State)
- **Purpose**: Manage temporary UI state (e.g., search input while typing)
- **Location**: `src/lib/stores/use-filter-store.ts`
- **Used for**:
  - Search input value (before form submission)
  - Typing state (to prevent URL sync while user is typing)
  - Future: Modal states, dropdown open/closed states

### 3. Custom Hook (`useFilterParams`)
- **Purpose**: Clean interface for reading and updating URL params
- **Location**: `src/hooks/use-filter-params.ts`
- **Benefits**:
  - Centralized URL param management
  - Consistent API across components
  - Automatic page reset on filter changes

## Data Flow

```
User Types in Search Input
    ↓
Zustand Store (temporary state)
    ↓
User Submits Form
    ↓
useFilterParams.updateFilter()
    ↓
URL Params Updated (source of truth)
    ↓
Server Component Reads URL Params
    ↓
API Fetches Filtered Data
    ↓
Page Renders with Results
```

## Key Principles

1. **URL Params = Source of Truth**: All actual filter values are stored in URL
2. **Zustand = Temporary UI State**: Only for values not yet committed to URL
3. **Server Components Read URL**: Initial data fetching uses URL params directly
4. **Client Components Use Hook**: Clean abstraction for URL param management

## Example Usage

```typescript
// In a Client Component
const { getFilter, updateFilter } = useFilterParams()
const { searchInput, setSearchInput } = useFilterStore()

// Read from URL (source of truth)
const currentType = getFilter('type', 'all')

// Update URL (triggers navigation)
updateFilter('type', 'condo')

// Temporary UI state (not in URL yet)
<input 
  value={searchInput} 
  onChange={(e) => setSearchInput(e.target.value)}
/>
```

