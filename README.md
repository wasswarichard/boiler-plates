# Getting Started with Application

## Available Scripts

In the root directory, you can run:

### `npm run install:dependencies`

Installs dependencies for both the frontend and backend.

### `Run dbMigrations`
1. update postgresql database config in backend/db/pool.js
2.  `npm run dbMigrations` runs database migrations and creates table data.

### `npm start`

Starts both the frontend and backend in watch mode.

## Deploying the application on heroku server
1. setting up the postgresql database nuri on heroku server as dependency for the backend running in the same environment.
2. Enable auto deploy for the backend repository with github repository
3. Update the frontend baseApiUrl in the frontend/src/Helpers/config.json, setting heroku environment and enable auto deploy for the frontend repository with github repository

## Learn More

You can get more details from backend/readme.md and frontend/readme.md