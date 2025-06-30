# Gemini Workspace Configuration

This file helps tailor Gemini's behavior to your specific project needs and preferences. By providing information about your project, you can get more relevant and accurate assistance.

## User Preferences

- **Preferred Coding Style:** (e.g., "Follow Google's TypeScript style guide.")
- **Commonly Used Commands:** (e.g., "npm run test", "npm run dev:panelpunches")
- **Other Preferences:** (e.g., "Always use yarn instead of npm.")
- **Commit Workflow:** When the user types `commit`, automatically generate a commit message for file changes (in plain text format, without line numbers) and ask for confirmation before committing.

## Project Overview

The list of US Zip Codes, with their corresponding state names, can be found in the `./src/data/us-zip-codes.csv` file.
 

## Key Technologies

This project leverages the following core technologies and frameworks:
- **Node.js** – Backend runtime environment.
- **TypeScript (5+)** – Strongly typed JavaScript for both frontend and backend.
- **GraphQL** – API query language used across services.
- **Jest** – Testing framework for unit and integration tests.
  - **jest-mock-extended** – For strongly-typed Jest mocks.

 

## Tool Configuration

- **Test Command:** `npm run test`.
- **Lint Command:** `npm lint:fix`
- **Build Command:** `npm run build`
