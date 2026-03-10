# Standard CSS Classes Documentation

This document describes all the standardized CSS classes defined in `standard.css`. These classes provide consistent styling across the application.

## Table of Contents

1. [Layout Containers](#layout-containers)
2. [Typography - Headers](#typography---headers)
3. [Typography - Paragraphs & Text](#typography---paragraphs--text)
4. [Typography - Links](#typography---links)
5. [Forms - Labels & Inputs](#forms---labels--inputs)
6. [Buttons](#buttons)
7. [Cards](#cards)

---

## Layout Containers

### `.settings-page-container`
**Purpose:** Main container for settings pages with consistent vertical spacing
**Usage:** Wrap entire settings page content
**Example:**
```tsx
<div className="settings-page-container">
  {/* Page content */}
</div>
```
**Tailwind Equivalent:** `flex flex-col gap-16`

---

### `.page-header-container`
**Purpose:** Container for page header sections with bottom border divider
**Usage:** Wrap page title and subheader
**Example:**
```tsx
<div className="page-header-container">
  <h2 className="page-title">Settings</h2>
  <p className="subheader">Manage your preferences</p>
</div>
```
**Tailwind Equivalent:** `pb-6 border-b border-gray-300`

---

### `.section-container`
**Purpose:** Container for content sections with responsive layout and bottom border
**Usage:** Wrap major content sections in settings pages
**Example:**
```tsx
<div className="section-container">
  <div>
    <h3 className="section-header">Profile</h3>
    <p className="section-description">Update your profile information</p>
  </div>
  {/* Section content */}
</div>
```
**Tailwind Equivalent:** `flex flex-col md:flex-row gap-10 items-start border-b border-gray-300 pb-10`

---

## Typography - Headers

### `.page-title`
**Purpose:** Main page title (typically h2 element)
**Usage:** Main heading for each page
**Element:** Usually `<h2>`
**Example:**
```tsx
<h2 className="page-title">Account Settings</h2>
```
**Tailwind Equivalent:** `text-3xl font-extrabold`
**Dark Mode:** Inherits from theme

---

### `.section-header`
**Purpose:** Section header (typically h3 element)
**Usage:** Headers for content sections within pages
**Element:** Usually `<h3>`
**Example:**
```tsx
<h3 className="section-header">Email Notifications</h3>
```
**Tailwind Equivalent:** `font-extrabold text-lg`
**Dark Mode:** Inherits from theme

---

### `.section-header-danger`
**Purpose:** Section header for danger/delete actions
**Usage:** Headers for destructive actions or warnings
**Element:** Usually `<h3>`
**Example:**
```tsx
<h3 className="section-header-danger">Delete Account</h3>
```
**Tailwind Equivalent:** `font-extrabold text-lg text-red-600`
**Dark Mode:** Red color in both modes

---

## Typography - Paragraphs & Text

### `.subheader`
**Purpose:** Descriptive text below main page headings
**Usage:** Provides context or description for page content
**Element:** Usually `<p>`
**Example:**
```tsx
<p className="subheader">
  Manage your account information and preferences.
</p>
```
**Tailwind Equivalent:** `text-base font-semibold text-gray-600 dark:text-gray-400 mt-2`
**Dark Mode:** Lighter gray (`text-gray-400`) for better visibility

---

### `.section-description`
**Purpose:** Descriptive text below section headers
**Usage:** Provides context for section content
**Element:** Usually `<p>`
**Example:**
```tsx
<p className="section-description">
  Choose which notifications you want to receive.
</p>
```
**Tailwind Equivalent:** `text-sm font-light mt-1`
**Dark Mode:** Inherits from theme

---

## Typography - Links

### `.auth-link`
**Purpose:** Links in authentication pages (login, register)
**Usage:** Navigation links between auth pages
**Element:** Usually `<a>` or `<Link>`
**Example:**
```tsx
<Link to="/register" className="auth-link">
  Create an account
</Link>
```
**Tailwind Equivalent:** `font-extrabold underline hover:text-violet-400`
**Hover:** Changes to violet color

---

### `.auth-link-small`
**Purpose:** Small muted links in auth forms (e.g., "Forgot password")
**Usage:** Secondary links in authentication pages
**Element:** Usually `<a>` or `<Link>`
**Example:**
```tsx
<a href="#" className="auth-link-small">
  Forgot password?
</a>
```
**Tailwind Equivalent:** `ml-auto inline-block text-sm text-muted-foreground font-extrabold underline hover:text-violet-400`
**Hover:** Changes to violet color

---

## Forms - Labels & Inputs

### `.form-label`
**Purpose:** Standard form field labels
**Usage:** Labels for input fields
**Element:** Usually `<label>`
**Example:**
```tsx
<label htmlFor="email" className="form-label">
  Email Address
</label>
```
**Tailwind Equivalent:** `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`
**Accessibility:** Handles disabled state styling

---

## Buttons

### `.btn-main-action`
**Purpose:** Main action buttons with prominent styling
**Usage:** Important actions like logout, delete, submit
**Element:** Usually `<Button>`
**Example:**
```tsx
<Button className="btn-main-action">
  Log out
</Button>
```
**Tailwind Equivalent:**
```
bg-violet-400 text-white font-extrabold w-full md:w-56 py-3
transition-all duration-200
hover:bg-red-500 hover:shadow-md hover:scale-[1.02]
active:scale-[0.98]
```
**Interactions:**
- Hover: Changes to red background, adds shadow, scales up slightly
- Active: Scales down for press effect
- Responsive: Full width on mobile, fixed width on desktop

---

### `.btn-auth-submit`
**Purpose:** Submit buttons for authentication forms
**Usage:** Login and register form submissions
**Element:** Usually `<Button>`
**Example:**
```tsx
<Button type="submit" className="btn-auth-submit">
  Sign in
</Button>
```
**Tailwind Equivalent:** `w-full bg-black text-white dark:bg-white dark:text-black`
**Dark Mode:** Inverted colors (white background, black text)

---

## Cards

### `.card-title-standard`
**Purpose:** Title for invoice/ride cards
**Usage:** Card headers in list views
**Element:** Usually `<CardTitle>`
**Example:**
```tsx
<CardTitle className="card-title-standard">
  Invoice #123
</CardTitle>
```
**Tailwind Equivalent:** `text-lg font-semibold`

---

### `.card-description-small`
**Purpose:** Small descriptive text in cards
**Usage:** Metadata or secondary information in cards
**Element:** Usually `<CardDescription>`
**Example:**
```tsx
<CardDescription className="card-description-small">
  Created on 12/17/2024
</CardDescription>
```
**Tailwind Equivalent:** `mt-3 text-xs`

---

## Usage Guidelines

1. **Always prefer these standard classes** over writing custom Tailwind classes for these patterns
2. **Consistency is key** - using these classes ensures uniform styling across the application
3. **Dark mode support** - classes with color variations automatically handle dark mode
4. **Responsive design** - many classes include responsive breakpoints built-in
5. **Combine when needed** - you can still add additional Tailwind classes for specific needs

## Migration Example

### Before:
```tsx
<div className="flex flex-col gap-16">
  <div className="pb-6 border-b border-gray-300">
    <h2 className="text-3xl font-extrabold">Settings</h2>
    <p className="text-base font-semibold text-gray-600 dark:text-gray-400 mt-2">
      Manage your preferences
    </p>
  </div>
</div>
```

### After:
```tsx
<div className="settings-page-container">
  <div className="page-header-container">
    <h2 className="page-title">Settings</h2>
    <p className="subheader">Manage your preferences</p>
  </div>
</div>
```

---

## File Location

- **CSS File:** `frontend/src/standard.css`
- **Import:** Already imported in `frontend/src/main.tsx`
- **Documentation:** `frontend/src/standard-classes.md` (this file)
