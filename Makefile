.PHONY: help build dev deploy clean logs

help:
	@echo "Available commands:"
	@echo "  make build    - Build Docker images"
	@echo "  make dev      - Start development environment"
	@echo "  make deploy   - Deploy to Kubernetes"
	@echo "  make clean    - Clean up Docker resources"
	@echo "  make logs     - View application logs"

build:
	@echo "Building backend..."
	cd backend && docker build -t about-backend:latest .
	@echo "Building frontend..."
	cd frontend && docker build -t about-frontend:latest .

dev:
	@echo "Starting development environment..."
	docker-compose up --build

deploy:
	@echo "Deploying to Kubernetes..."
	./deploy.sh

clean:
	@echo "Cleaning up..."
	docker-compose down -v
	kubectl delete -f k8s/ --ignore-not-found=true

logs:
	@echo "Viewing logs..."
	docker-compose logs -f
