# Build stage
FROM rust:1.75-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache musl-dev openssl-dev

# Copy manifests
COPY Cargo.toml ./

# Copy source code
COPY src ./src

# Build the application
RUN cargo build --release

# Runtime stage
FROM alpine:latest

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache libgcc

# Copy the binary from builder
COPY --from=builder /app/target/release/about-backend /app/

# Expose port
EXPOSE 8080

# Run the binary
CMD ["./about-backend"]
