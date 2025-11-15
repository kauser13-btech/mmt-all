#!/bin/bash

# Product Mockup Generation Script
# This script helps you generate product mockups in batches

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Product Mockup Generation${NC}"
echo "=================================="
echo ""

# Default values
CHUNK_SIZE=20
DESIGN_SCALE=0.6
SNEAKER_SCALE=0.4
SKIP_EXISTING=""
PRODUCT_ID=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --product-id)
            PRODUCT_ID="--product-id=$2"
            shift 2
            ;;
        --chunk-size)
            CHUNK_SIZE=$2
            shift 2
            ;;
        --skip-existing)
            SKIP_EXISTING="--skip-existing"
            shift
            ;;
        --help)
            echo "Usage: ./generate-mockups.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --product-id ID      Generate for specific product ID only"
            echo "  --chunk-size N       Process N products per chunk (default: 20)"
            echo "  --skip-existing      Skip products that already have mockups"
            echo "  --help               Show this help message"
            echo ""
            echo "Examples:"
            echo "  ./generate-mockups.sh"
            echo "  ./generate-mockups.sh --product-id 42"
            echo "  ./generate-mockups.sh --chunk-size 50 --skip-existing"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Check if Docker is running
if ! docker compose ps | grep -q "Up"; then
    echo -e "${RED}Error: Docker containers are not running${NC}"
    echo "Please start Docker with: docker compose up -d"
    exit 1
fi

# Run the command
echo -e "${YELLOW}Starting mockup generation...${NC}"
echo ""

docker compose exec app php artisan product:generate-mockups \
    ${PRODUCT_ID} \
    --chunk-size=${CHUNK_SIZE} \
    --design-scale=${DESIGN_SCALE} \
    --sneaker-scale=${SNEAKER_SCALE} \
    ${SKIP_EXISTING}

echo ""
echo -e "${GREEN}Done!${NC}"
