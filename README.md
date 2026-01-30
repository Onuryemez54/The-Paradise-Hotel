# 🏨 The Paradise Hotel

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Auth-green)
![Prisma](https://img.shields.io/badge/Prisma-ORM-indigo)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Playwright](https://img.shields.io/badge/Testing-Playwright-green)
![Vitest](https://img.shields.io/badge/Testing-Vitest-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-grade **full-stack hotel booking platform** built with **Next.js 16, React 19, and TypeScript**, featuring secure authentication, transactional booking logic, internationalization, email workflows, and a fully responsive modern UI.

This project demonstrates real-world SaaS architecture with race-condition-safe booking creation, advanced middleware-based route protection, and enterprise-level error handling.

---

## 🚀 Project Summary

**The Paradise Hotel** is a production-grade full-stack booking system designed to simulate a real hotel reservation platform.

The project focuses on:

- Secure authentication & OAuth
- Transaction-based booking creation
- Multi-language & multi-currency pricing
- Middleware-based route protection
- Enterprise-level error & notification architecture

It showcases both **frontend excellence** and **backend data integrity**.

---

## 📸 Screenshots & UI Preview

### 🏠 Homepage

![Homepage](./public/screenshots/home.webp)

---

### 🏨 Rooms Page

![Rooms](./public/screenshots/rooms.webp)

---

### 🏨 Room Detail

![Room](./public/screenshots/room.webp)

---

### 📅 Booking

![Booking](./public/screenshots/booking.webp)

---

### 👤 Profile & Account

![Profile](./public/screenshots/profile.webp)

---

### 📅 Your Bokkings

![Your Bookings](./public/screenshots/bookings.webp)

---

## ✏️ Edit Booking Experience

| Dark Theme                               | Light Theme                               |
| ---------------------------------------- | ----------------------------------------- |
| ![](./public/screenshots/edit-dark.webp) | ![](./public/screenshots/edit-light.webp) |

---

## 📱 Responsive Mobile Experience

|              Mobile View 1              |              Mobile View 2              |
| :-------------------------------------: | :-------------------------------------: |
| ![](./public/screenshots/mobile-1.webp) | ![](./public/screenshots/mobile-2.webp) |

### 🧪 Vitest & Playwright Testing

| Vitest                                | Playwright E2E                     |
| ------------------------------------- | ---------------------------------- |
| ![](./public/screenshots/vitest.webp) | ![](./public/screenshots/e2e.webp) |

---

## ✨ Features

### 🔐 Authentication & Authorization

- Email and password authentication with Supabase Auth
- Google OAuth login
- New email verification link for expired confirmation links
- New reset link for expired reset links
- Proxy-based route protection:

- Authenticated users cannot access authentication routes
- Unauthted users cannot access protected account routes
- Password reset sessions are invalidated when exiting the reset flow

---

### 🏨 Booking System

- Interactive date range selection
- Create, edit, and delete bookings
- **Transactional booking creation** to prevent race conditions
- Automatic prevention of:
  - Overlapping bookings
  - Exceeding room capacity
- Selected dates stored in localStorage with reminders
- Auto-reset with warning when switching rooms with invalid dates

---

### 👤 Profile & Account

- Editable user profile
- Booking history management
- Secure account settings

---

### 🌍 Internationalization & Currency

- Supported languages:
  - 🇬🇧 English
  - 🇩🇪 German
  - 🇹🇷 Turkish
- Language switching updates:
  - UI texts
  - Date & number formatting
  - Price calculation with dynamic currency conversion

---

### 🎨 UI / UX

- Fully responsive (mobile, tablet, desktop)
- Dark / Light theme with persistent state
- Smooth animations with Framer Motion
- Global toast notification system:
  - Success
  - Info
  - Warning
  - Error

---

### 📧 Custom Email Templates

The application uses custom-built email templates specifically designed for this project.
All transactional emails — including feedback notifications, email verification, and password reset emails — are styled and structured to match the application’s identity.

Each email contains application-specific content, clear messaging, and user-related details, ensuring a consistent and professional communication experience.

---

### 🧠 State & Validation

- Context-based room state
- localStorage persistence
- Automatic guest adjustment based on room capacity
- Zod schema validation
- React Hook Form integration

---

### ⚠️ Error Handling System

- Centralized `AppError` abstraction
- Typed error categories
- i18n-aware messages
- `handleAppError` mapping
- Severity-based toast notifications

---

### 📩 Email System

- Resend SMTP integration
- Custom HTML templates
- Supported flows:
  - Email verification
  - Password reset
  - Feedback submission from homepage

---

### 🧪 Testing

- Unit & integration tests:
  - Vitest
  - Testing Library
  - MSW
- End-to-end testing:
  - Playwright

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- Framer Motion
- Swiper
- React Day Picker

---

### Backend & Infrastructure

- Supabase Auth (Email + Google OAuth)
- Prisma ORM
- PostgreSQL
- Transaction-based booking creation
- Proxy middleware for route protection

---

### Forms, Validation & i18n

- react-hook-form
- zod
- next-intl

---

### Email & Notifications

- Resend SMTP
- Custom templates
- Typed toast status system

---

## 🏗️ System Architecture

📘 Detailed architecture: [ARCHITECTURE.md](./ARCHITECTURE.md)

```mermaid
flowchart TD

    UI[React 19 + Next.js 16 UI]
    Middleware[Proxy Middleware<br/>Route Protection]
    Auth[Supabase Auth<br/>Email / Google OAuth]
    Server[Server Actions & API Routes]
    Prisma[Prisma ORM]
    DB[(PostgreSQL)]
    Resend[Resend SMTP]
    I18N[next-intl]
    Toast[Toast & Error System]

    UI --> Middleware
    Middleware --> Auth
    Middleware --> Server

    Server --> Prisma
    Prisma --> DB

    Server --> Resend
    UI --> I18N
    Server --> Toast
```

## ▶️ Running Tests

This project includes unit, integration, and end-to-end tests.

### 🧪 Unit & Integration Tests (Vitest)

```bash
npm run test / npm t

npm run test:ui
```

### 🎭 End-to-End Tests (Playwright)

```bash
npm run test:e2e

npm run test:e2e:ui

npm run test:e2e:headed
```

### 🔐 Environment Variables

This project relies on environment variables for authentication, database access, and email services.

Create `.env.local` and `.env` files based on `.env.example`:

> Environment variables are required to configure external services such as Supabase, PostgreSQL, and Resend.

## ⚡ Getting Started

```bash
### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation


git clone https://github.com/Onuryemez54/The-Paradise-Hotel.git


# Install dependencies
npm install
# or
yarn install


## Running the Project

# Start development server (Vite)
npm run dev
```

📬 **Contact**

Created by **Onur Ahmet Yemez**
Full-Stack Developer

🔗 GitHub: https://github.com/Onuryemez54

Feel free to reach out for collaboration, feedback, or questions.
