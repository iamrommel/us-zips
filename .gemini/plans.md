
# Plan: US ZIP Code Information Service

This document outlines the development plan for creating a GraphQL API to serve US ZIP code information. The data will be read directly from a CSV file using `papaparse`. The entire application will be containerized using Docker for portability and ease of deployment.

---

### **Phase 1: Project Initialization & Setup**

**Goal:** Create a structured, scalable project foundation with all necessary dependencies.

1.  **Initialize Node.js Project:**
    *   Run `npm init -y` to create a `package.json` file.

2.  **Install Dependencies:**
    *   **Runtime Dependencies:** `npm install express express-graphql graphql papaparse`
    *   **Development Dependencies:** `npm install -D typescript ts-node nodemon @types/node @types/express @types/papaparse jest ts-jest @types/jest`

3.  **Setup TypeScript:**
    *   Run `npx tsc --init` to generate a `tsconfig.json` file.
    *   Configure `tsconfig.json` with appropriate settings (`rootDir`, `outDir`, `moduleResolution`, etc.).

4.  **Create Directory Structure:**
    ```
    /
    ├── dist/                  (Compiled TypeScript output)
    └── src/
        ├── data/
        │   └── us-zip-codes.csv  (Data source)
        ├── graphql/
        │   ├── resolvers.ts
        │   └── schema.ts
        └── index.ts           (API Server entry point)
    ```

5.  **Add `package.json` Scripts:**
    *   `"start": "node dist/index.js"`
    *   `"dev": "nodemon src/index.ts"`
    *   `"build": "tsc"`
    *   `"test": "jest"`

---

### **Phase 2: API Layer (GraphQL & Express)**

**Goal:** Develop the GraphQL API to expose the ZIP code data.

1.  **Define GraphQL Schema (`src/graphql/schema.ts`):**
    *   **`ZipCode` Type:** Define a type representing a ZIP code entry with fields like `zip_code`, `state_name`, etc.
    *   **`Query` Type:** Define the available queries.
        *   `getZipByCode(zip_code: String!): ZipCode`
        *   `getZipsByState(state_name: String!): [ZipCode]`

2.  **Implement Resolvers (`src/graphql/resolvers.ts`):**
    *   Create resolver functions corresponding to the queries defined in the schema.
    *   Each resolver will:
        1.  Accept arguments (e.g., `zip_code`).
        2.  Read and parse the `./src/data/us-zip-codes.csv` file using `papaparse`.
        3.  Filter the parsed data based on the query arguments.
        4.  Format and return the data according to the GraphQL schema.

3.  **Setup Express Server (`src/index.ts`):**
    *   Create an Express application instance.
    *   Configure the `/graphql` endpoint using `express-graphql`.
    *   Pass the schema and resolvers to the `graphqlHTTP` middleware.
    *   Start the server to listen on a specified port (e.g., 4000).

---

### **Phase 3: Containerization (Docker)**

**Goal:** Package the application into a self-contained Docker image for deployment.

1.  **Create `Dockerfile`:**
    *   Start from an official Node.js base image (e.g., `node:20-alpine`).
    *   Set the working directory (e.g., `WORKDIR /app`).
    *   Copy `package.json` and `package-lock.json`.
    *   Install production dependencies (`npm install --omit=dev`).
    *   Copy the `src/data/us-zip-codes.csv` file into the image.
    *   Copy the compiled application code from `dist/`.
    *   Expose the application port (e.g., `EXPOSE 4000`).
    *   Set the startup command (`CMD ["node", "dist/index.js"]`).

2.  **Create `.dockerignore` file:**
    *   Exclude `node_modules`, `.git`, `.idea`, `src`, `*.md`, etc., to keep the image lean and improve build times.

---

### **Phase 4: Documentation & Testing**

**Goal:** Ensure the project is well-documented and reliable.

1.  **Write Unit Tests:**
    *   Create tests for the GraphQL resolvers (`src/graphql/resolvers.test.ts`).
    *   Use Jest to mock the CSV reading and parsing to verify that resolvers return the correct data structures for given inputs.

2.  **Write Integration Tests:**
    *   Create tests that directly call the HTTP API for GraphQL (e.g., using `supertest` or `node-fetch`).
    *   Verify that the API endpoints return the expected data for various queries.

3.  **Create `README.md`:**
    *   Provide a clear overview of the project.
    *   Include detailed instructions for:
        *   Local setup (`npm install`).
        *   Running the server (`npm run dev`).
        *   Building and running with Docker.
    *   Provide example GraphQL queries that users can run.
