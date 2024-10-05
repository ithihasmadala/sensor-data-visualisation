# Sensor Data Visualization App

This project is a React application that visualizes sensor data using Ant Design components and Recharts.

## Project Overview

This application fetches sensor data from a ThingSpeak API and displays it using line charts. It includes:

- A responsive layout with a navbar, workspace, and footer
- Dynamic chart generation based on fetched sensor data
- Error handling for data fetching and display
- GPS data visualization

## Technologies Used

- React 18.3.1
- TypeScript 4.9.5
- Ant Design 5.21.2
- Recharts 2.12.7
- Styled Components 5.3.10
- Leaflet 1.9.4 (for map visualization)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: This project requires Node.js version 14.0 or higher. You can download it from [nodejs.org](https://nodejs.org/).
- Yarn: We use Yarn as our package manager. If you don't have Yarn installed, you can install it after installing Node.js by running:
  ```
  npm install -g yarn
  ```

To verify your installations, run:

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   yarn install
   ```
3. Create a `.env` file in the root directory and add your ThingSpeak API key:
   ```
   REACT_APP_THINGSPEAK_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   yarn start
   ```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn deploy`

Builds the app and deploys it to GitHub Pages.

### `yarn lint`

Runs ESLint to check for code style issues.

### `yarn prettier`

Formats the code using Prettier.

### `yarn validate`

Runs linting, formatting, and type-checking.

## Key Components

- `App.tsx`: Main application layout
- `Workspace.tsx`: Manages sensor data and renders charts
- `Chart.tsx`: Renders individual charts for each sensor
- `ChartSummary.tsx`: Displays summary information for each chart
- `GpsMap.tsx`: Renders a map with GPS coordinates

## Development Tools

- Prettier: For code formatting
- ESLint: For code linting (extends React App ESLint configuration)
- TypeScript: For static type checking

## Deployment

This project is set up to deploy to GitHub Pages using the `gh-pages` package. To deploy, run:
