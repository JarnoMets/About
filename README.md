# About Project

A template project with Vue.js frontend and Rust backend.

## Structure

- `backend/` - Rust backend using Actix-web
- `frontend/` - Vue.js frontend with TypeScript
- `k8s/` - Kubernetes deployment manifests
- `logs/` - Application logs

## Development

### Prerequisites

- Docker and Docker Compose
- Node.js 20+
- Rust 1.75+
- kubectl (for Kubernetes deployment)

### Running Locally

```bash
# Using docker-compose
docker-compose up --build

# Or using the dev script
chmod +x dev.sh
./dev.sh

# Or using Make
make dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

### Building

```bash
# Build all images
make build

# Or build individually
cd backend && docker build -t about-backend:latest .
cd frontend && docker build -t about-frontend:latest .
```

## Deployment

### Kubernetes

```bash
# Deploy to cluster
chmod +x deploy.sh
./deploy.sh

# Or using Make
make deploy
```

### Configuration

Update the following files with your configuration:
- `k8s/backend-deployment.yaml` - Database connection and environment variables
- `k8s/frontend-ingressroute.yaml` - Domain name
- `k8s/postgres-deployment.yaml` - Database credentials

## API Endpoints

- `GET /health` - Health check
- `GET /api/example` - Example endpoint

## License

MIT
