# SPA User Side Frontend

This is the user-facing frontend application for the SPA management system, built with React + Vite.

## Features

- User authentication and registration
- Service booking and appointment scheduling
- Professional selection
- Payment processing with Network International
- User profile management
- Booking history and order tracking

## Tech Stack

- React 19
- Vite
- React Router DOM
- Bootstrap
- Axios for API calls
- Network International Payment Gateway

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Configuration

The application is configured to connect to the production backend at `https://spamanagment.onrender.com/api/v1`.

For local development, you can update the base URL in `src/Service/Base_url.jsx` and `src/Service/Api.jsx`.
