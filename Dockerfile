# Build stage for React frontend
FROM node:20-slim AS frontend-build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM python:3.12-slim

WORKDIR /app

# Install Python dependencies
COPY api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy FastAPI backend
COPY api/ ./api/

# Copy built frontend from build stage
COPY --from=frontend-build /app/dist ./dist

# Copy static files (images, etc.)
COPY public/ ./dist/

# Expose port
EXPOSE 8080

# Run FastAPI with uvicorn
CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "8080"]
