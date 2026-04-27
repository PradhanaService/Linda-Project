# Expense Tracker Using React and Firebase

A full-stack Expense Tracker built with React, Vite, Tailwind CSS, Firebase Authentication, and Firestore. Users can register, login, add income and expenses, filter transactions, and view charts for spending and balance trends.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Firebase Authentication
- Firebase Firestore
- Recharts
- Date-fns
- React Hot Toast

## Features

- Email/password registration and login
- Protected dashboard routes
- User-specific Firestore transaction storage
- Add, edit, and delete income or expense transactions
- Search, type filter, category filter, month filter, and sorting
- INR currency formatting
- Dashboard summary cards
- Category pie chart, monthly bar chart, and balance trend line chart
- CSV transaction export
- PDF report export
- Rich profile insights
- Light and dark mode toggle
- Responsive mobile and desktop UI
- Loading, empty, error, and toast states

## Setup Steps

```bash
npm install
npm run dev
npm run build
```

## Firebase Setup

1. Create a Firebase project from the Firebase Console.
2. Enable Authentication and turn on the Email/Password provider.
3. Create a Firestore Database.
4. Copy your web app Firebase config values into `.env`.
5. Use `.env.example` as the required variable reference.
6. When deploying on Vercel, add the same variables under **Project Settings > Environment Variables** and redeploy.
7. Add the Vercel domain in Firebase Authentication under **Settings > Authorized domains**.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## Folder Structure

```text
expense-tracker-firebase/
  docs/
    PROJECT_DOCUMENTATION.md
  screenshots/
  public/
  src/
    components/
    pages/
    routes/
    services/
    firebase/
      firebase.js
    context/
      AuthContext.jsx
    utils/
    App.jsx
    main.jsx
    index.css
  .env.example
  .gitignore
  README.md
  package.json
```

## Documentation

Read the full documentation at [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md).

## Screenshots

Run the app, navigate to each page, take screenshots using Windows + Shift + S, and save them in the `screenshots` folder using the filenames listed in the documentation.

## Author

Created as a placement-ready React and Firebase project.
