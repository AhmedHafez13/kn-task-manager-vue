# Task Manager App

This frontend application is built with Vue.js and Vuetify, providing a responsive and user-friendly interface for a task management system. It includes features such as user authentication, task management, and a paginated task list with detailed views.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Components](#components)
- [Utilities](#utilities)
- [License](#license)

## Features

- **User Authentication**: Login and registration pages with form validation.
- **Task Management**: Paginated task list with detailed views and task management features.
- **Reusable Components**: Modular components and layouts to facilitate development and maintenance.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/AhmedHafez13/kn-task-manager-vue.git
   cd kn-task-manager-vue
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```bash
VITE_BASE_URL=http://localhost:3000
```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

or

```bash
yarn dev
```

This will start the server on `http://localhost:3000`.

## Project Structure

The project structure is organized as follows:

```plaintext
├── layouts                # Layouts for different parts of the app
│   ├── MainLayout.vue     # Main layout with header and footer
│   └── default.vue        # Default layout
├── components             # Reusable Vue components
│   ├── ConfirmDialog.vue  # A dialog component for confirmations
│   ├── AppHeader.vue      # Application header component
│   └── AppFooter.vue      # Application footer component
├── router                 # Application routing
│   └── index.ts           # Route definitions and guards
├── utils                  # Utility functions and helpers
│   ├── app.regex.ts       # Regular expressions used in the app
│   ├── app.toaster.ts     # Toaster notifications
│   ├── app.storage.ts     # Local storage utilities
│   └── app.validations.ts # Form validation utilities
├── const                  # Constant values
│   └── storage-keys.ts    # Keys for local storage
├── settings               # Application settings and configurations
│   └── vuetify-defaults.ts# Vuetify component defaults
├── types                  # TypeScript types
│   ├── user.types.ts      # User-related types
│   └── global.types.ts    # Global types
├── modules                # Feature modules
│   ├── auth               # Authentication module
│   │   ├── pages          # Authentication pages
│   │   │   ├── LoginPage.vue    # Login page
│   │   │   └── RegisterPage.vue # Registration page
│   │   └── auth.routes.ts       # Authentication routes
│   ├── home               # Home module
│   │   ├── pages          # Home page
│   │   │   └── HomePage.vue      # Home page component
│   │   └── home.routes.ts        # Home routes
│   └── tasks              # Task management module
│       ├── tasks.types.ts # Task-related types
│       ├── tasks.routes.ts# Task routes
│       ├── pages          # Task pages
│       │   └── TasksPage.vue      # Main tasks page
│       ├── views          # Task-related views
│       │   ├── TaskForm.vue       # Form for creating/editing tasks
│       │   ├── TasksTable.vue     # Paginated tasks table
│       │   └── TaskDetails.vue    # Task details view
├── services               # API services
│   ├── auth.service.ts    # Authentication service
│   ├── axios.ts           # Axios instance setup
│   └── tasks.service.ts   # Task management service
```

## Routing

The application uses Vue Router for navigation. The `router/index.ts` file defines the routes for the application, including public and protected routes.

- **Authentication Routes**: Routes for login and registration (`/login`, `/register`).
- **Home Route**: Main landing page (`/`).
- **Tasks Routes**: Routes for managing tasks (`/tasks`).

## Components

The components are modular and reusable throughout the application:

- **AppHeader.vue**: The main application header, including navigation.
- **AppFooter.vue**: The footer component for consistent styling.
- **ConfirmDialog.vue**: A generic dialog component used for confirmations.

## Utilities

Utility functions and constants are located in the `utils` and `const` directories:

- **app.regex.ts**: Contains regular expressions for validating input fields.
- **app.toaster.ts**: Handles toast notifications across the app.
- **app.storage.ts**: Provides methods to interact with local storage.
- **app.validations.ts**: Provides form validation functions.
- **storage-keys.ts**: Defines keys for storing data in local storage.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
