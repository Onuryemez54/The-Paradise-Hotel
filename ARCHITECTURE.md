# 🏗️ The Paradise Hotel — System Architecture

## Overview

This document describes the high-level architecture of **The Paradise Hotel** platform.

---

## Layers

### UI Layer

- Next.js App Router
- React 19 components
- Forms, calendars, themes, i18n

---

### Middleware Layer

- Proxy-based route protection
- Auth / account route enforcement
- Reset-session invalidation

---

### Authentication Layer

- Supabase Auth
- Email & Google OAuth
- Verification & reset workflows

---

### Server Layer

- Server Actions
- API routes
- Booking orchestration
- Validation & transactions

---

### Database Layer

- PostgreSQL
- Prisma ORM
- Transaction-safe booking creation

---

### Email Layer

- Resend SMTP
- Verification, reset, feedback

---

### Error & Notification Layer

- Centralized AppError
- Typed categories
- Toast severity mapping
