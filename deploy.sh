#!/bin/bash

# Build and deploy the About application to Kubernetes

set -e

echo "Building Docker images..."

# Build backend
echo "Building backend..."
cd backend
docker build -t about-backend:latest .
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
docker build -t about-frontend:latest .
cd ..

echo "Deploying to Kubernetes..."

# Apply Kubernetes manifests
kubectl apply -f k8s/postgres-namespace.yaml
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-ingressroute.yaml

echo "Deployment complete!"
echo "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres -n about-db --timeout=120s
kubectl wait --for=condition=ready pod -l app=about-backend -n about --timeout=120s
kubectl wait --for=condition=ready pod -l app=about-frontend -n about --timeout=120s

echo "All pods are ready!"
echo ""
echo "To check the status, run:"
echo "  kubectl get pods -n about"
echo "  kubectl get pods -n about-db"
