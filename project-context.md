# Cursor Project Context: Luxury Real Estate Marketplace

## 1. 🎯 Project Mission & Goal

-   **Primary Goal:** To be the premier **luxurious real estate marketplace** for **pre-construction properties**.
-   **Target Audience:** Consumers (final buyers) seeking high-end, new developments.
-   **Unique Selling Proposition (USP):** The exclusive focus on a curated, luxury pre-development inventory. This is not a generic real estate portal.

## 2. 🌟 Core Features

The primary user-facing features will be:

1.  **Advanced Search & Filtering:** Granular search by location, price, amenities, completion date, etc.
2.  **Map-Based View:** Interactive map to browse listings geographically.
3.  **Mortgage Calculator:** Integrated tool to estimate payments.
4.  **Saved Favorites:** User accounts to save and compare properties.

## 3. 💻 The Tech Stack

This stack is definitive. All code generation must adhere to it.

-   **Framework:** **Next.js** (App Router)
-   **Language:** **TypeScript**
-   **Styling:** **Tailwind CSS**
-   **UI Components:** **Shadcn/ui** (Use primitives in `src/components/ui`, do not use external component libraries unless necessary).
-   **Backend:** **Next.js API Routes** (Server Actions are also acceptable where appropriate).
-   **Database:** **PostgreSQL**
-   **Authentication:** **Better Auth**
-   **Data Fetching:** Native `fetch` (Server) / **TanStack Query** (Client).

## 4. 📐 Architecture & Project Structure

We follow a **Hybrid Structure** to maximize SEO and maintainability.

### Folder Structure
-   **`src/app/`**: Contains all routes.
    -   **Colocation Rule:** If a component is **only** used in a specific page, place it inside that page's folder (e.g., `src/app/listings/[id]/components/ListingGallery.tsx`). This improves code splitting and performance.
-   **`src/components/ui/`**: Reserved **exclusively** for Shadcn/ui primitives (Button, Input, Card, etc.).
-   **`src/components/shared/`**: Global components used across multiple pages (Navbar, Footer, PropertyCard).
-   **`src/lib/`**: Utility functions, database clients, and Zod schemas.
-   **`src/hooks/`**: Global custom hooks.

### State Management Strategy (Performance First)
-   **Server State:** Use **Server Components** for initial data fetching (SEO critical). Use **TanStack Query** for client-side updates/interactions.
-   **URL State:** Store **Search Filters** (price, location, etc.) in the URL using `useSearchParams`. This is mandatory for shareability and SEO.
-   **Global UI State:** Use **Zustand** for global UI needs (e.g., Auth state, Global Modals). Avoid Redux.
-   **Local State:** Use `useState` for component-level interactivity.

## 5. 📜 Coding Standards & Conventions

**CRITICAL: THIS IS THE MOST IMPORTANT RULE.**

All coding standards, naming conventions, style rules, and "don'ts" are **explicitly defined in the `.cursor/rules` files** located in the repository.

**You MUST read, respect, and strictly adhere to the `.cursor/rules` file for all code generation and modification.** Do not invent your own styles or conventions.

## 6. 🔗 Third-Party Integrations & Services

-   **Core (Active):**
    -   **Google Maps API:** Used for property map views and location-based searches.
-   **Planned (Future):**
    -   **CRM Integration:** To send leads to the sales team.
    -   **Ad Info API:** To track ad performance.

## 7. 🎨 Design & UX

-   **Source of Truth:** We have a **v0 design mock** that guides the layout and aesthetic.
-   **Aesthetic:** Luxurious, minimal, clean, and professional. High emphasis on visual hierarchy and whitespace.