# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the source code and config files
COPY src/ ./src/
COPY tsconfig.json ./

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the data file from the builder stage
COPY --from=builder /app/src/data/us-zips.csv ./dist/data/us-zips.csv

EXPOSE 4000

CMD ["node", "dist/index.js"]
