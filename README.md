# 🎨 Frontend — Nuxt 3 + Vuetify 3 + Socket.io

A modern and dynamic **frontend application** built with **Nuxt 3** and **Vuetify 3**, designed to interact seamlessly with the NestJS backend.  
This app provides a smooth experience for **authentication**, **public notes**, and a **real-time chat system**, all built with a modular and composable architecture.

---

## 🚀 Tech Stack

- **Nuxt 3** — Vue-powered meta framework for modern web apps  
- **Vuetify 3** — Material Design UI components  
- **Pinia** — State management for user/session handling  
- **Socket.io Client** — Real-time chat communication  
- **TypeScript** — Strongly typed and scalable  
- **Custom Fetch Wrapper (`$customFetch`)** — Secure and centralized API handling  

---

## ⚙️ Features

### 🔐 Authentication System

- JWT-based login integrated with the NestJS backend  
- Uses composable `useAuthUser()` for managing user state  
- Includes `login`, `logout`, and automatic token persistence  
- All API calls use `$customFetch()` for secure, centralized requests  


### 💬 Real-Time Chat

- Built using **Socket.io Client**  
- Secure WebSocket connection with user token  
- Real-time message broadcasting  
- Tracks online user count (`userCount`)  
- Automatically reconnects on network loss  
- Displays incoming messages dynamically while preventing self-echo  


### 🗒️ Public Notes

- Create, view, update, and delete public notes (no login required)  
- Integrated with backend endpoints  
- Reactive note list updates after CRUD actions  
- Elegant Vuetify cards and dialogs for notes display  


### 🧑‍💻 User Dashboard

- Authenticated area for users to view and manage their tasks or profile  
- Responsive layout built with Vuetify grid system  
- Conditional rendering for login/register vs. logged-in state  

---

## 🧠 Authentication Logic (useAuthUser.ts)

- Stores and retrieves JWT from `localStorage`  
- Keeps user data in a reactive Pinia store  
- Handles automatic logout on token expiration  
- Exposes composables for login, logout, and checking auth state  

---

## 🪄 Styling and Design

- Built entirely with **Vuetify 3**  
- Responsive layout supporting both dark/light mode  
- Simple, clean interface (no glassmorphism)  
- Modern components for forms, dialogs, and lists  


---

## 🧩 Backend Integration

This frontend connects to the **NestJS + Prisma backend**, which provides:

- [`/auth`](https://github.com/mmdreza21/Nestjs_prisma_task_manager/tree/main/src/auth) for authentication  
- [`/notes`](https://github.com/mmdreza21/Nestjs_prisma_task_manager/tree/main/src/notes) for public CRUD  
- [`/chat`](https://github.com/mmdreza21/Nestjs_prisma_task_manager/tree/main/src/chat) for WebSocket connections  
- [`/tasks`](https://github.com/mmdreza21/Nestjs_prisma_task_manager/tree/main/src/tasks) and [`/users`](https://github.com/mmdreza21/Nestjs_prisma_task_manager/tree/main/src/users) for protected actions  

⚙️ **Backend Repo:** [NestJS + Prisma Task Manager](https://github.com/mmdreza21/Nestjs_prisma_task_manager)

---


## ❤️ Author

**Mohammad Reza**

> “Coding isn’t just a career — it’s how I translate creativity into logic.”  
> GitHub: [@mmdreza21](https://github.com/mmdreza21)
