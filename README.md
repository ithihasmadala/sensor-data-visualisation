# Sensor Data Visualization App

This project is a React application that visualizes sensor data using Ant Design components and charts.

## Project Overview

This application fetches sensor data from a ThingSpeak API and displays it using line charts. It includes:

- A responsive layout with a navbar, workspace, and footer
- Dynamic chart generation based on fetched sensor data
- Error handling for data fetching and display

## Technologies Used

- React 18.3.1
- TypeScript 4.9.5
- Ant Design 5.21.2
- @ant-design/charts 2.2.1
- React Scripts 5.0.1

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## Key Components

- `App.tsx`: Main application layout
- `Workspace.tsx`: Fetches and manages sensor data
- `Chart.tsx`: Renders individual charts for each sensor

## Development Tools

- Prettier: For code formatting
- ESLint: For code linting (extends React App ESLint configuration)

## Browser Support

- Production: Browsers with >0.2% market share, excluding dead browsers and Opera Mini
- Development: Latest versions of Chrome, Firefox, and Safari

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

For Ant Design, visit the [Ant Design documentation](https://ant.design/).

For information on the charts used, see [@ant-design/charts](https://charts.ant.design/).
