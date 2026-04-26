# Expense Tracker Using React and Firebase

## Project Overview

Expense Tracker is a responsive web application that helps users register, login, and manage personal income and expenses. Users can add transaction details, categorize records, filter and search transaction history, and view visual spending reports. Data is stored securely in Firebase Firestore under each authenticated user.

## Objectives

- Track income and expenses
- Visualize spending
- Provide secure user-specific data
- Practice Firebase authentication and Firestore CRUD

## Tech Stack

- **React:** Builds reusable UI components and pages.
- **Vite:** Provides fast development and optimized production builds.
- **Tailwind CSS:** Styles the dashboard, forms, cards, tables, and responsive layouts.
- **React Router:** Handles public, protected, and nested application routes.
- **Firebase Authentication:** Provides email and password registration, login, logout, and auth state tracking.
- **Firebase Firestore:** Stores each user's transactions in a nested collection.
- **Recharts:** Displays pie, bar, and line charts.
- **Date-fns:** Formats transaction dates and month labels.
- **React Hot Toast:** Shows success and error notifications.

## Features

- User registration with email and password
- User login with email and password
- Logout functionality
- Protected dashboard routes
- User-specific transaction storage
- Add income and expense transactions
- Edit existing transactions
- Delete transactions with confirmation
- Required transaction fields: type, title, amount, category, payment method, date, notes, timestamps
- Default income and expense categories
- Search by transaction title
- Filter by type, category, and month
- Sort by newest, oldest, highest amount, and lowest amount
- Dashboard cards for total income, total expenses, balance, and monthly spending
- Recent transactions section
- Pie chart for expense categories
- Bar chart for monthly income vs expenses
- Line chart for balance trend
- Loading states, empty states, validation messages, and toast notifications
- Mobile responsive layout
- INR currency format

## System Architecture

```text
React Frontend -> Firebase Auth -> Firestore Database
```

The React frontend handles routing, forms, dashboard UI, and reports. Firebase Authentication manages user sessions. Firestore stores data under the logged-in user's document path, so each account reads and writes only its own transactions.

## Firebase Setup Guide

1. Go to the Firebase Console and create a new Firebase project.
2. Open **Authentication** and enable the **Email/Password** sign-in provider.
3. Open **Firestore Database** and create a database.
4. Register a Firebase web app and copy the config values.
5. Paste the config values into `.env` using the variables below.
6. The Firebase config is read from `src/firebase/firebase.js`.

Required `.env` variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## Firestore Database Structure

```text
users/{userId}/transactions/{transactionId}
```

Transaction document fields:

```text
id
userId
type: income or expense
title
amount
category
paymentMethod
date
notes
createdAt
updatedAt
```

## Firestore Security Rules

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/transactions/{transactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Installation Steps

```bash
npm install
npm run dev
npm run build
```

## Project Folder Structure

```text
expense-tracker-firebase/
  docs/
    PROJECT_DOCUMENTATION.md
  screenshots/
  public/
  src/
    components/
      BalanceLineChart.jsx
      CategoryPieChart.jsx
      ConfirmModal.jsx
      Layout.jsx
      LoadingSpinner.jsx
      MonthlyBarChart.jsx
      Navbar.jsx
      ProtectedRoute.jsx
      SearchFilterBar.jsx
      Sidebar.jsx
      SummaryCard.jsx
      TransactionCard.jsx
      TransactionForm.jsx
      TransactionTable.jsx
    pages/
      AddTransactionPage.jsx
      DashboardPage.jsx
      EditTransactionPage.jsx
      LandingPage.jsx
      LoginPage.jsx
      NotFoundPage.jsx
      ProfilePage.jsx
      RegisterPage.jsx
      ReportsPage.jsx
      TransactionsPage.jsx
    routes/
      routePaths.js
    services/
      transactionService.js
      useTransactions.js
    firebase/
      firebase.js
    context/
      AuthContext.jsx
    utils/
      analytics.js
      constants.js
      formatters.js
    App.jsx
    main.jsx
    index.css
  .env
  .env.example
  .gitignore
  README.md
  package.json
```

## Screenshots

Do not generate fake screenshots. Run the app, navigate to each page, take screenshots using Windows + Shift + S, and save them in the screenshots folder using the exact filenames mentioned below.

### 1. Landing Page
![Landing Page](../screenshots/landing-page.png)

### 2. Register Page
![Register Page](../screenshots/register-page.png)

### 3. Login Page
![Login Page](../screenshots/login-page.png)

### 4. Dashboard
![Dashboard](../screenshots/dashboard.png)

### 5. Add Transaction
![Add Transaction](../screenshots/add-transaction.png)

### 6. Transactions List
![Transactions List](../screenshots/transactions-list.png)

### 7. Reports Page
![Reports Page](../screenshots/reports-page.png)

### 8. Profile Page
![Profile Page](../screenshots/profile-page.png)

## Testing Checklist

- Register works
- Login works
- Logout works
- Add transaction works
- Edit transaction works
- Delete transaction works
- Search/filter works
- Charts update correctly
- Firebase data is user-specific
- Mobile responsive layout works

## Future Enhancements

- Budget limits
- PDF export
- CSV export
- Recurring expenses
- Email reports
- Expense reminders
- Cloud image upload for receipts

## Conclusion

Expense Tracker demonstrates a complete React and Firebase workflow with authentication, protected routes, Firestore CRUD, reusable components, responsive Tailwind CSS design, and chart-based reporting. It is suitable for learning, portfolio presentation, and further enhancement into a more advanced personal finance tool.
