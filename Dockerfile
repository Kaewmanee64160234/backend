# Stage 1: Build the app
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build the application
COPY . .
RUN npm run build

# Stage 2: Run the app in a smaller image
FROM node:18-slim

WORKDIR /app

# Copy only the built files and node_modules from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Start the NestJS app
CMD ["node", "dist/main"]
