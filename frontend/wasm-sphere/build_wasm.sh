#!/usr/bin/env bash
set -euo pipefail

# Helper: build the wasm crate and run wasm-bindgen to produce JS glue
# into the frontend public folder so the dev server can serve it at
# /wasm-sphere/wasm_sphere.js
#
# Requirements (install if missing):
#   rustup target add wasm32-unknown-unknown
#   cargo install wasm-bindgen-cli
#
# Usage:
#   ./build_wasm.sh
# After this, run the frontend dev server: (from repo root)
#   npm --prefix frontend run dev

ROOT_DIR=$(cd "$(dirname "$0")" && pwd)
FRONTEND_PUBLIC_DIR="$ROOT_DIR/../public/wasm-sphere"
WASM_TARGET=target/wasm32-unknown-unknown/release/wasm_sphere.wasm
WASM_TARGET_PATH="$ROOT_DIR/$WASM_TARGET"

echo "=> Ensure output dir exists: $FRONTEND_PUBLIC_DIR"
mkdir -p "$FRONTEND_PUBLIC_DIR"

echo "=> Building wasm crate (release, target wasm32-unknown-unknown)"
pushd "$ROOT_DIR" > /dev/null
cargo build --release --target wasm32-unknown-unknown
popd > /dev/null

if [ ! -f "$WASM_TARGET_PATH" ]; then
  echo "ERROR: wasm file not found at $WASM_TARGET_PATH"
  exit 2
fi

echo "=> Running wasm-bindgen to generate web target into public folder"
wasm-bindgen "$WASM_TARGET_PATH" --out-dir "$FRONTEND_PUBLIC_DIR" --target web

echo "Done. Files placed in: $FRONTEND_PUBLIC_DIR"
echo "Start the frontend dev server and the torus renderer will be able to import '/wasm-sphere/wasm_sphere.js' at runtime."
