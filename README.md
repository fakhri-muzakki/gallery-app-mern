# Gallery Product CRUD App

A modern **CRUD (Create, Read, Update, Delete) single-page application** built as a frontend portfolio project.
This application demonstrates **real-world frontend practices**, including optimistic updates, clean UI architecture, and integration with a serverless REST API.

The main goal of this project is not only functionality, but also **UX quality, responsiveness, and maintainable frontend code**.

---

## ✨ Features

- Display product data in a responsive grid / list
- Create, update, and delete products
- Optimistic UI updates for a faster user experience
- Dark theme interface
- Accessible UI components (keyboard & screen-reader friendly)
- Client-side form validation
- Loading, error, and disabled states to prevent double actions
- Toast-based feedback for user actions

---

## ⚡ Optimistic Update

This project implements **optimistic updates**, meaning:

- UI updates immediately after a user action (create / update / delete)
- No need to wait for the server response to reflect changes
- If the API request fails, the UI state is reverted and an error message is shown

This approach improves perceived performance and provides a smoother user experience, which is commonly used in **production-grade applications**.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Form Validation**: Valibot
- **Notifications**: react-hot-toast
- **Backend**: REST API (Express.js, Serverless)

---

## 🌐 API Integration

This frontend consumes a RESTful API deployed as a **serverless backend**.

**Base API URL (Production):**

```
https://api-gallery-image.vercel.app/api
```

**Products Endpoint:**

```
GET /products
POST /products
PUT /products/:id
DELETE /products/:id
```

All API responses follow a consistent JSON format:

```json
{
  "success": true,
  "message": "string",
  "data": "object | array | null"
}
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/fakhri-muzakki/crud-mern.git
cd crud-mern
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 📁 Project Structure (Simplified)

```text
app/            # Next.js App Router
components/     # Reusable UI components
libs/           # API & helper utilities
schemas/        # Valibot validation schemas
types/          # Shared TypeScript types
```

---

## ✅ Best Practices Applied

- Type-safe API consumption with TypeScript
- Schema-based validation using Valibot
- Stateless frontend logic (serverless-ready)
- Optimistic state management
- Clear separation between UI, logic, and API layers
- Production-oriented folder structure

---

## 📌 Notes

- This project is part of a **personal MERN Stack learning journey**
- Designed to be easily extended with authentication or pagination
- Suitable as a portfolio project demonstrating modern frontend skills
