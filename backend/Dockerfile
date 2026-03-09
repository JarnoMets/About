# Build stage
FROM rust:1.94-bullseye AS builder

WORKDIR /app

# Install build dependencies (pkg-config and libssl-dev for OpenSSL)
RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
	   pkg-config \
	   libssl-dev \
	   ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

# Copy manifests and source
COPY Cargo.toml ./
COPY src ./src

# Build the application (release)
RUN cargo build --release

# Runtime stage using a slim Debian image so dynamic OpenSSL is available
FROM debian:bullseye-slim

WORKDIR /app

# Install runtime dependencies (shared OpenSSL and CA certs)
RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
	   ca-certificates \
	   libssl1.1 \
	&& rm -rf /var/lib/apt/lists/*

# Copy the binary from the builder
COPY --from=builder /app/target/release/about-backend /app/

# Expose port
EXPOSE 8080

# Run the binary
CMD ["./about-backend"]
